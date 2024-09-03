package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

// Config holds the environment variables and other configurations
type Config struct {
	GithubToken   string
	MesheryToken  string
	Cookie        string
	LogFilePath   string
	HelmPluginDir string
}

// MesheryDesignPayload represents the payload for creating a Meshery snapshot
type MesheryDesignPayload struct {
	Save  bool   `json:"save"`
	URL   string `json:"url"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

// WorkflowPayload represents the payload for triggering the workflow
type WorkflowPayload struct {
	Owner       string      `json:"Owner"`
	Repo        string      `json:"Repo"`
	Workflow    string      `json:"Workflow"`
	Branch      string      `json:"Branch"`
	GithubToken string      `json:"GithubToken"`
	Payload     interface{} `json:"Payload"`
}

// LoadEnv loads environment variables from a .env file using the godotenv package
func LoadEnv(envPath string) error {
	err := godotenv.Load(envPath)
	if err != nil {
		return fmt.Errorf(".env file not found at %s", envPath)
	}
	return nil
}

// CreateLogFile creates the log file if it doesn't exist
func CreateLogFile(logFilePath string) error {
	if _, err := os.Stat(logFilePath); os.IsNotExist(err) {
		file, err := os.Create(logFilePath)
		if err != nil {
			return err
		}
		file.Close()
	}
	return nil
}

// Log writes a message to the log file with a timestamp
func Log(message, logFilePath string) error {
	logMessage := fmt.Sprintf("%s - %s\n", time.Now().Format("2006-01-02 15:04:05"), message)
	fmt.Println(logMessage)
	return ioutil.WriteFile(logFilePath, []byte(logMessage), os.ModeAppend)
}

// ExtractNameFromURI extracts the name from the URI
func ExtractNameFromURI(uri string) string {
	filename := filepath.Base(uri)
	return strings.TrimSuffix(filename, filepath.Ext(filename))
}

// CreateMesheryDesign creates a Meshery Design via API
func CreateMesheryDesign(config *Config, uri, name, email string) (string, error) {
	payload := MesheryDesignPayload{
		Save:  true,
		URL:   uri,
		Name:  name,
		Email: email,
	}

	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest("POST", fmt.Sprintf("https://playground.meshery.io/api/pattern/Helm Chart"), bytes.NewBuffer(payloadBytes))
	if err != nil {
		return "", err
	}

	req.Header.Set("Cookie", config.Cookie)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept-Encoding", "gzip, deflate, br, zstd")
	req.Header.Set("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := ioutil.ReadAll(resp.Body)
		return "", fmt.Errorf("failed to create meshery design. response: %s", string(body))
	}

	// Expecting a JSON array in the response
	var result []map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return "", err
	}

	if len(result) > 0 {
		if id, ok := result[0]["id"].(string); ok {
			return id, nil
		}
	}

	return "", errors.New("invalid response from meshery api")
}

// GenerateSnapshot triggers the snapshot workflow
func GenerateSnapshot(config *Config, designID, chartURI string) error {
	payload := WorkflowPayload{
		Owner:       "",
		Repo:        "",
		Workflow:    "",
		Branch:      "",
		GithubToken: config.GithubToken,
		Payload: map[string]string{
			"designId":     designID,
			"filePath":     chartURI,
			"githubToken":  config.GithubToken,
			"mesheryToken": config.MesheryToken,
		},
	}

	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", "http://localhost:9876/api/api/integrations/trigger/workflow", bytes.NewBuffer(payloadBytes))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := ioutil.ReadAll(resp.Body)
		return fmt.Errorf("Failed to generate snapshot. Response: %s", string(body))
	}

	return nil
}

func main() {
	chartURI := flag.String("f", "", "URI to Helm chart")
	name := flag.String("n", "", "Optional name for the Meshery design")
	email := flag.String("e", "", "Optional email to associate with the Meshery design")
	flag.Parse()

	if *chartURI == "" {
		log.Fatal("Error: URI to Helm chart is required.")
	}

	// Load environment variables from the .env file
	envPath := filepath.Join(os.Getenv("HELM_PLUGIN_DIR"), ".env")
	err := LoadEnv(envPath)
	if err != nil {
		log.Fatalf("Failed to load .env file: %s", err)
	}

	config := &Config{
		GithubToken:   os.Getenv("GITHUB_TOKEN"),
		MesheryToken:  os.Getenv("MESHERY_TOKEN"),
		Cookie:        os.Getenv("COOKIE"),
		LogFilePath:   filepath.Join(os.Getenv("HELM_PLUGIN_DIR"), "snapshot.log"),
		HelmPluginDir: os.Getenv("HELM_PLUGIN_DIR"),
	}

	err = CreateLogFile(config.LogFilePath)
	if err != nil {
		log.Fatalf("Failed to create log file: %s", err)
	}

	// Use the extracted name from URI if not provided
	if *name == "" {
		*name = ExtractNameFromURI(*chartURI)
		Log(fmt.Sprintf("No name provided. Using extracted name: %s", *name), config.LogFilePath)
	}

	Log("Starting Helm chart conversion to Meshery Design...", config.LogFilePath)

	// Create Meshery Snapshot
	designID, err := CreateMesheryDesign(config, *chartURI, *name, *email)
	if err != nil {
		Log(fmt.Sprintf("Error: %s", err), config.LogFilePath)
		os.Exit(1)
	}

	Log(fmt.Sprintf("Meshery design created successfully. design ID: %s", designID), config.LogFilePath)

	// Generate the snapshot using the provided API
	err = GenerateSnapshot(config, designID, *chartURI)
	if err != nil {
		Log(fmt.Sprintf("Error: %s", err), config.LogFilePath)
		os.Exit(1)
	}

	Log("Snapshot generated successfully.", config.LogFilePath)

	// Clean up log file
	Log("Cleaning up log file...", config.LogFilePath)
	err = os.Remove(config.LogFilePath)
	if err != nil {
		log.Fatalf("Failed to clean up log file: %s", err)
	}

	Log("Operation completed successfully.", config.LogFilePath)
}

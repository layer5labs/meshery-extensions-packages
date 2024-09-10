package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
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
	GithubToken         string
	MesheryToken        string
	Cookie              string
	LogFilePath         string
	HelmPluginDir       string
	Owner               string
	Repo                string
	Workflow            string
	Branch              string
	MesheryCloudBaseUrl string
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
	return os.WriteFile(logFilePath, []byte(logMessage), os.ModeAppend)
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
	sourceType := "Helm Chart"
	req, err := http.NewRequest("POST", fmt.Sprintf("https://playground.meshery.io/api/pattern/%s", sourceType), bytes.NewBuffer(payloadBytes))
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
		body, _ := io.ReadAll(resp.Body)
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

func GenerateSnapshot(config *Config, designID, chartURI, assetLocation, email string) error {

	payload := map[string]interface{}{
		"Owner":       config.Owner,
		"Repo":        config.Repo,
		"Workflow":    config.Repo,
		"Branch":      config.Branch,
		"GithubToken": config.GithubToken,
		"email":       config.GithubToken,
		"Payload": map[string]string{
			"application_type": "Helm Chart",
			"designID":         designID,
			"assetLocation":    assetLocation,
		},
	}

	// Marshal the payload into JSON
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	// Create the POST request
	req, err := http.NewRequest(
		"POST",
		fmt.Sprintf("%s/api/integrations/trigger/workflow", config.MesheryCloudBaseUrl),
		bytes.NewBuffer(payloadBytes),
	)
	if err != nil {
		return err
	}

	req.Header.Set("Cookie", config.Cookie)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+config.GithubToken) // Use the GitHub token for authentication

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Check the response status
	if resp.StatusCode != http.StatusNoContent {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("failed to dispatch workflow. response: %s", string(body))
	}

	return nil
}

func main() {
	chartURI := flag.String("f", "", "URI to Helm chart")
	name := flag.String("n", "", "Optional name for the Meshery design")
	email := flag.String("e", "", "Optional email to associate with the Meshery design") // Added email flag
	flag.Parse()

	if *chartURI == "" {
		log.Fatal("Error: URI to Helm chart is required.")
	}

	envPath := filepath.Join(os.Getenv("HELM_PLUGIN_DIR"), ".env")
	err := LoadEnv(envPath)
	if err != nil {
		log.Fatalf("Failed to load .env file: %s", err)
	}

	config := &Config{
		GithubToken:         os.Getenv("GITHUB_TOKEN"),
		MesheryToken:        os.Getenv("MESHERY_TOKEN"),
		Cookie:              os.Getenv("COOKIE"),
		LogFilePath:         filepath.Join(os.Getenv("HELM_PLUGIN_DIR"), "snapshot.log"),
		HelmPluginDir:       os.Getenv("HELM_PLUGIN_DIR"),
		Owner:               os.Getenv("OWNER"),
		Repo:                os.Getenv("REPO"),
		Workflow:            os.Getenv("WORKFLOW"),
		Branch:              os.Getenv("BRANCH"),
		MesheryCloudBaseUrl: os.Getenv("MESHERY_CLOUD_BASE_URL"),
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
	designID, err := CreateMesheryDesign(config, *chartURI, *name, *email) // Pass email here
	if err != nil {
		Log(fmt.Sprintf("Error: %s", err), config.LogFilePath)
		os.Exit(1)
	}

	Log(fmt.Sprintf("Meshery design created successfully. design ID: %s", designID), config.LogFilePath)
	assetLocation := fmt.Sprintf("https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/action-assets/helm-plugin-assets/%s.png", designID)

	err = GenerateSnapshot(config, designID, *chartURI, assetLocation, *email)
	if err != nil {
		Log(fmt.Sprintf("Error: %s", err), config.LogFilePath)
		os.Exit(1)
	}
	Log(fmt.Sprintf("Snapshot generated successfully. Snapshot URL: %s", assetLocation), config.LogFilePath)

	// Clean up log file
	Log("Cleaning up log file...", config.LogFilePath)
	err = os.Remove(config.LogFilePath)
	if err != nil {
		log.Fatalf("Failed to clean up log file: %s", err)
	}

	Log("Operation completed successfully.", config.LogFilePath)
}

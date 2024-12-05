package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

type Subscription struct {
    PricingPage   string                 `json:"pricing_page,omitempty"`
    Documentation string                 `json:"documentation,omitempty"`
    EntireRow     map[string]string      `json:"entire_row,omitempty"`
}

func main() {
    client := &http.Client{}
    req, err := http.NewRequest("GET", os.Getenv("INPUT_SPREADSHEET_URI"), nil)
    if err != nil {
        panic(err)
    }

    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    // Read the response body
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        panic(err)
    }

    // Reset the response body for CSV reading
    resp.Body = io.NopCloser(strings.NewReader(string(body)))

    if (resp.StatusCode == 404) {
        fmt.Println("google spreadsheets not found, please update the URL")
        os.Exit(1)
    }

    if (resp.StatusCode != 200) {
        fmt.Printf("google spreadsheets not responding with status ok, but got %v \n", resp.StatusCode)
        os.Exit(1)
    }

    // Create a CSV reader from the response body
    reader := csv.NewReader(resp.Body)
    reader.FieldsPerRecord = -1
    reader.LazyQuotes = true

    // Skip the first row (row one)
    _, err = reader.Read()
    if err != nil {
        panic(err)
    }

    // Read the second row (actual column headers)
    headers, err := reader.Read()
    if err != nil {
        panic(err)
    }

    fmt.Println("Headers:", headers)



    var subscriptions []Subscription
    for {
        record, err := reader.Read()

        fmt.Println("Record:", record)
        
        if err != nil {
            break
        }

        sub := Subscription{
            EntireRow: make(map[string]string), // Initialize the map for the row
        }
        includeSub := false

		for i, header := range headers {
			trimmedHeader := strings.TrimSpace(header)
			lowercaseHeader := strings.ToLower(trimmedHeader)

			// Only include specified headers in the EntireRow map
			switch lowercaseHeader {
			case "category", "theme (also: keychain name)", "function", "feature", "subscription tier", "tech", "pricing page?", "documented?", "free comparison tier","teamDesigner comparison tier","teamOperator comparison tier","enterprise comparison tier":
				sub.EntireRow[trimmedHeader] = strings.TrimSpace(record[i])
			}

			// Check the pricing page and documented fields
			switch lowercaseHeader {
			case "pricing page?":
				value := strings.ToLower(strings.TrimSpace(record[i]))
				if value == "x" || value == "true" || value == "X"{
					sub.PricingPage = "true"
					includeSub = true
				}
			case "documented?":
				value := record[i]
				if strings.HasPrefix(value, "https://docs.meshery.io/") || strings.HasPrefix(value, "https://docs.layer5.io/") {
					sub.Documentation = value
					includeSub = true
				}
			}
		}

        // If a match is found, include this row in the JSON output
        if includeSub {
            subscriptions = append(subscriptions, sub)
        }
    }

    // Marshal the subscriptions to JSON
    jsonData, err := json.MarshalIndent(subscriptions, "", "  ")
    if err != nil {
        panic(err)
    }

    // Write the JSON data to a file
    if err := os.WriteFile("feature_data.json", jsonData, 0644); err != nil {
        panic(err)
    }

    fmt.Println("Feature data updated successfully")
}
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
	PricingPage   string   `json:"pricing_page,omitempty"`
	Documentation string   `json:"documentation,omitempty"`
	EntireRow     []string `json:"entire_row,omitempty"` // New field to store the entire row
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

	fmt.Println("Response Status:", resp.Status)

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println("Response Body:", string(body))

	// Reset the response body for CSV reading
	resp.Body = io.NopCloser(strings.NewReader(string(body)))

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

	// Debugging: Print the headers to verify their format
	fmt.Println("Headers:", headers)

	var subscriptions []Subscription
	for {
		record, err := reader.Read()
		if err != nil {
			break
		}

		// Debugging: Print the record to verify what is being read
		fmt.Println("Record:", record)

		sub := Subscription{}
		includeSub := false

		for i, header := range headers {
			switch strings.ToLower(strings.TrimSpace(header)) {
			case "pricing page":
				value := strings.ToLower(record[i])
				if value == "x" || value == "true" {
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

		// If a match is found, add the entire row to the subscription
		if includeSub {
			sub.EntireRow = record // Store the entire row
			subscriptions = append(subscriptions, sub)
		}
	}

	// Marshal the subscriptions to JSON
	jsonData, err := json.MarshalIndent(subscriptions, "", "  ")
	if err != nil {
		panic(err)
	}

	// Write the JSON data to a file
	if err := os.WriteFile("pricing_data.json", jsonData, 0644); err != nil {
		panic(err)
	}

	fmt.Println("Pricing data updated successfully")
}

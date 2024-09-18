package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
)

type Subscription struct {
	PricingPage   string `json:"pricing_page,omitempty"`
	Documentation string `json:"documentation,omitempty"`
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
			switch strings.ToLower(strings.TrimSpace(header)) {  // Fix for trimming spaces
			case "pricing page":  // Match exact column name from CSV
				value := strings.ToLower(record[i])
				if value == "x" || value == "true" {
					sub.PricingPage = "true"
					includeSub = true
				}
			case "documented?":  // Match exact column name from CSV
				value := record[i]
				if strings.HasPrefix(value, "https://docs.meshery.io/") || strings.HasPrefix(value, "https://docs.layer5.io/") {
					sub.Documentation = value
					includeSub = true
				}
			}
		}

		if includeSub {
			subscriptions = append(subscriptions, sub)
		}
	}

	jsonData, err := json.MarshalIndent(subscriptions, "", "  ")
	if err != nil {
		panic(err)
	}

	if err := os.WriteFile("pricing_data.json", jsonData, 0644); err != nil {
		panic(err)
	}

	fmt.Println("Pricing data updated successfully")
}

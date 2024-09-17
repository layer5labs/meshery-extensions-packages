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

type Header struct {
	Row1 []string `json:"row1"`
}

type Subscription struct {
	Category    string `json:"category"`
	Function    string `json:"function"`
	Feature     string `json:"feature"`
	Description string `json:"description"`
	Published   string `json:"published"`
	// Add other fields as needed
}

type PricingData struct {
	Headers       Header         `json:"headers"`
	Subscriptions []Subscription `json:"subscriptions"`
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
	reader.FieldsPerRecord = -1 // Allow variable number of fields

	pricingData := PricingData{}

	// Read and store the first row as header information
	row1, err := reader.Read()
	if err != nil {
		panic(err)
	}
	pricingData.Headers.Row1 = row1

	// Read the second row to use as column headers
	headers, err := reader.Read()
	if err != nil {
		panic(err)
	}

	// Read the data rows (starting from the third row onwards)
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			panic(err)
		}

		sub := Subscription{}
		for i, header := range headers {
			if i >= len(record) {
				continue // Skip if record doesn't have this many fields
			}
			switch strings.ToLower(strings.TrimSpace(header)) {
			case "category":
				sub.Category = record[i]
			case "function":
				sub.Function = record[i]
			case "feature":
				sub.Feature = record[i]
			case "feature description":
				sub.Description = record[i]
			case "published":
				sub.Published = record[i]
			// Add other cases as needed
			}
		}

		published := strings.ToLower(strings.TrimSpace(sub.Published))
		if published == "true" || published == "x" {
			pricingData.Subscriptions = append(pricingData.Subscriptions, sub)
		}
	}

	// Convert the pricingData to JSON and write it to a file
	jsonData, err := json.MarshalIndent(pricingData, "", "  ")
	if err != nil {
		panic(err)
	}

	if err := os.WriteFile("pricing_data.json", jsonData, 0644); err != nil {
		panic(err)
	}

	fmt.Println("Pricing data updated successfully")
}

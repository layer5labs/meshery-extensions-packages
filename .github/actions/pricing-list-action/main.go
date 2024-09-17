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
	Published string `csv:"Published"`
}

func main() {
	client := &http.Client{}
	req, err := http.NewRequest("GET", os.Getenv("INPUT_SPREADSHEET_URI"), nil)
	if err != nil {
		panic(err)
	}

	// req.Header.Add("Authorization", "Bearer "+os.Getenv("INPUT_SPREADSHEET_KEY"))
	
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	reader := csv.NewReader(resp.Body)
	reader.FieldsPerRecord = -1 
	reader.LazyQuotes = true  
	headers, err := reader.Read()
	if err != nil {
		panic(err)
	}

	var subscriptions []Subscription
	for {
		record, err := reader.Read()
		if err != nil {
			break
		}

		sub := Subscription{}
		for i, header := range headers {
			switch strings.ToLower(header) {
			case "published":
				sub.Published = record[i]
			}
		}

		published := strings.ToLower(sub.Published)
		if published == "true" || published == "x" {
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

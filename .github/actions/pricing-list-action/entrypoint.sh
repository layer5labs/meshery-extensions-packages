#!/bin/sh
set -e

go run <<EOF
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "net/http"
  "os"
  "strings"

  "github.com/gocarina/gocsv"
)

type Subscription struct {
  Published string \`csv:"Published"\`
}

func main() {
  client := &http.Client{}
  req, err := http.NewRequest("GET", os.Getenv("INPUT_SPREADSHEET_URI"), nil)
  if err != nil {
    panic(err)
  }
  req.Header.Add("Authorization", "Bearer "+os.Getenv("INPUT_SPREADSHEET_KEY"))
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  body, err := ioutil.ReadAll(resp.Body)
  if err != nil {
    panic(err)
  }

  var subscriptions []Subscription
  if err := gocsv.UnmarshalBytes(body, &subscriptions); err != nil {
    panic(err)
  }

  var filteredSubscriptions []Subscription
  for _, sub := range subscriptions {
    published := strings.ToLower(sub.Published)
    if published == "true" || published == "x" {
      filteredSubscriptions = append(filteredSubscriptions, sub)
    }
  }

  jsonData, err := json.MarshalIndent(filteredSubscriptions, "", "  ")
  if err != nil {
    panic(err)
  }

  if err := ioutil.WriteFile("pricing_data.json", jsonData, 0644); err != nil {
    panic(err)
  }

  fmt.Println("Pricing data updated successfully")
}
EOF
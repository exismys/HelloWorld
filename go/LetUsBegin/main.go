package main

import (
	"fmt"
  "net/http"
  "encoding/json"
  "math/rand"
  "github.com/fatih/color"
)

type Quote struct {
  Q string `json:"q"` // the quote
  A string `json:"a"` // author
  H string `json:"h"` // html
}

func quote() {
  const quoteApi = "https://zenquotes.io/api/quotes"
  res, err := http.Get(quoteApi)
  if (err != nil) {
    fmt.Printf("Error fetching quote of the day: %v",  err)
  }
  defer res.Body.Close()
  
  var quotes []Quote
  if err := json.NewDecoder(res.Body).Decode(&quotes); err != nil {
    fmt.Printf("Error decoding JSON response: %v\n", err)
    return
  }

  quote := quotes[rand.Intn(len(quotes))]
  fmt.Println()
  color.Magenta("  %s", quote.Q)
  color.Cyan("   \u2014 %s", quote.A)
  fmt.Println()
}

func main() {
  quote()
}

package main

import (
	"fmt"
  "net/http"
  "encoding/json"
  "math/rand"
  "time"
  "os"
  "github.com/fatih/color"
)


const quoteCacheFile = "/tmp/quote-cache.json"
const quoteApi = "https://zenquotes.io/api/quotes"


type Quote struct {
  Quote string `json:"q"`
  Author string `json:"a"`
  Html string `json:"h"`
}

type QuoteCache struct {
  Data []Quote
  Timestamp time.Time
}


func main() {

  quote, err := quote()
  if err != nil {
    panic(err)
  }

  fmt.Println()
  color.Yellow("  %s", quote.Quote)
  color.Cyan("   \u2014 %s", quote.Author)
  fmt.Println()
}


func quote() (*Quote, error) {
  
  cached, err := readCache()
  if (err == nil && time.Since(cached.Timestamp) < time.Hour * 24) {
    quotes := cached.Data
    randIndex := rand.Intn(len(quotes))
    return &quotes[randIndex], nil
  }

  res, err := http.Get(quoteApi)
  if (err != nil) {
    return nil, err
  }
  defer res.Body.Close()
  
  var quotes []Quote
  if err := json.NewDecoder(res.Body).Decode(&quotes); err != nil {
    return nil, err
  }

  err = writeCache(quotes)
  if err != nil {
    fmt.Printf("Warning: Could not write to cache: %v", err)
  }

  return &quotes[rand.Intn(len(quotes))], nil
}

func readCache() (*QuoteCache, error){
  file, err := os.Open(quoteCacheFile)
  if err != nil {
    return nil, err
  }
  defer file.Close()

  var cache QuoteCache
  err = json.NewDecoder(file).Decode(&cache)
  
  return &cache, err
}


func writeCache(quotes []Quote) error {
  cache := QuoteCache {
    Data: quotes,
    Timestamp: time.Now(),
  }

  file, err := os.Create(quoteCacheFile)
  if err != nil {
    return err
  }
  defer file.Close()
  
  return json.NewEncoder(file).Encode(&cache)
}

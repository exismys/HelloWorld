package main

import (
  "fmt"
  "time"
)

func main() {
  for i := 0; i < 10; i++ {
    for j := 0; j < i + 1; j++ {
      fmt.Printf("#")
    }
    fmt.Printf("\r")
    time.Sleep(1 * time.Second)
  } 
}

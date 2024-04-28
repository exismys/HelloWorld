package main

import (
  "fmt"
)



func main() {
  var move string
  var whose string = "white's"
  for {
    fmt.Println(whose, "move: ")
    _, err := fmt.Scanln(&move)
    if err != nil {
      panic(err.Error())
    }
    if (move == "quit" || move == "q") {
      break;
    }
    _, err := processMove(move)
    if err != nil {
      panic(err.Error)
    }
    fmt.Println(whose, "moved:", move)
    whose = "black's"

  }
}

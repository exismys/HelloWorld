package main

import (
  "fmt"
)

type ChessBoard [8][8]int
var chessBoard ChessBoard = ChessBoard{
  {5, 3, 4, 8, 9, 4, 3, 5},
  {1, 1, 1, 1, 1, 1, 1, 1},
  {0, 0, 0, 0, 0, 0, 0, 0},
  {0, 0, 0, 0, 0, 0, 0, 0},
  {0, 0, 0, 0, 0, 0, 0, 0},
  {0, 0, 0, 0, 0, 0, 0, 0},
  {1, 1, 1, 1, 1, 1, 1, 1},
  {5, 3, 4, 8, 9, 4, 3, 5},
}

func processMove(cb ChessBoard, move string) {
  /* Print the chess board */
  for i := 0; i < 8; i++ {
    for j := 0; j < 8; j++ {
      fmt.Print(cb[i][j])
    }
    fmt.Println()
  }
}

func main() {
  /* Initialize the chessboard with pieces */
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
    processMove(chessBoard, move)
   // if err != nil {
   //   panic(err.Error)
   // }
    fmt.Println(whose, "moved:", move)
    whose = "black's"

  }
}

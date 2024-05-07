package main

import (
  "fmt"
  "errors"
)

/* ASCII color codes */
const BG_WHITE = "\033[47m"
const BG_BLACK = "\033[40m"
const FG_WHITE = "\033[37m"
const FG_BLACK = "\033[30m"
const BG_YELLOW = "\033[43m"
const RESET = "\033[0m" 


/* Declare Chess Board */
type ChessBoard [8][8]string
var chessBoard ChessBoard = ChessBoard{
  {"w5", "w3", "w4", "w8", "w9", "w4", "w3", "w5"},
  {"w1", "w1", "w1", "w1", "w1", "w1", "w1", "w1"},
  {"00", "00", "00", "00", "00", "00", "00", "00"},
  {"00", "00", "00", "00", "00", "00", "00", "00"},
  {"00", "00", "00", "00", "00", "00", "00", "00"},
  {"00", "00", "00", "00", "00", "00", "00", "00"},
  {"b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1"},
  {"b5", "b3", "b4", "b8", "b9", "b4", "b3", "b5"},
}


/* Function to display the chess board */
func displayBoard(cb ChessBoard, perspective string) {
  fmt.Println()
  fmt.Print("   ")
  for i := 0; i < 8; i++ {
    fmt.Print("---- ")
  }
  fmt.Println()

  /* Raw chess board array */
  if (perspective == "computer") {
    for i := 0; i < 8; i++ {
      fmt.Print("  | ")
      for j := 0; j < 8; j++ {
        fmt.Print(cb[i][j], " | ")
      }
      fmt.Println()
      fmt.Print("   ")
      for j := 0; j < 8; j++ {
        fmt.Print("---- ")
      }
      fmt.Println()
    }
  }

  /* If perspective is white */
  if (perspective == "white") {
    bgColor := ""
    reset := ""
    for i := 7; i >= 0; i-- {
      fmt.Print("  |", bgColor, " ", reset)
      for j := 0; j < 8; j++ {
        fmt.Print(bgColor, cb[i][j], " ", reset, "|")
        if bgColor == "" {
          bgColor = BG_BLACK
          reset = RESET
        } else {
          bgColor = ""
          reset = ""
        }
        if j != 7 {
         fmt.Print(bgColor, " ", reset)
        }
      }
      if bgColor == "" {
        bgColor = BG_BLACK
        reset = RESET
      } else {
        bgColor = ""
        reset = ""
      }
      fmt.Println()
      fmt.Print("   ")
      for j := 0; j < 8; j++ {
        fmt.Print("---- ")
      }
      fmt.Println()
    }
  }

  /* If perspective is black */
  if (perspective == "black") {
    bgColor := ""
    reset := ""
    for i := 0; i < 8; i++ {
      fmt.Print("  |", bgColor, " ", reset)
      for j := 7; j >= 0; j-- {
        fmt.Print(bgColor, cb[i][j], " ", reset, "|")
        if bgColor == "" {
          bgColor = BG_BLACK
          reset = RESET
        } else {
          bgColor = ""
          reset = ""
        }
        if j != 0 {
         fmt.Print(bgColor, " ", reset)
        }
      }
      if bgColor == "" {
        bgColor = BG_BLACK
        reset = RESET
      } else {
        bgColor = ""
        reset = ""
      }
      fmt.Println()
      fmt.Print("   ")
      for j := 0; j < 8; j++ {
        fmt.Print("---- ")
      }
      fmt.Println()
    }
  }

  fmt.Println()
}


/* Check if the chess move is valid */
func isValidMove(cb ChessBoard, move string) bool {
  var l int = len(move)
  fmt.Println(l)
  if l != 2 && l != 3 && l != 5 && l != 6 {
    return false
  }
  var piece string = string(move[0])
  var currentPositionX int
  var currentPositionY int
  var destPositionX int
  var destPositionY int
  if l >= 5 {
  }

  fmt.Println(piece, currentPositionX, currentPositionY, destPositionX, destPositionY)
  return true

}


/* Function to process the move */
func processMove(cb ChessBoard, move string) (bool, error) {
  if !isValidMove(cb, move) {
    return false, errors.New("Invalid move!")
  }
   
  return true, nil
}


func main() {
  displayBoard(chessBoard, "white")

  /* Start Game */
  var move string
  var turn string = "white"
  for {
    fmt.Println(turn, "to move: ")
    _, err := fmt.Scan(&move)
    if err != nil {
      panic(err.Error())
    }
    if (move == "quit" || move == "q" || move == "exit") {
      break;
    }
    _, err = processMove(chessBoard, move)
    if err != nil {
      panic(err.Error())
    }
    fmt.Println(turn, "moved:", move)
    turn = "black"
    displayBoard(chessBoard, turn)
  }
}

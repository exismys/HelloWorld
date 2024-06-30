package main

import (
  "fmt"
  "time"
)


func main() {
  clearScreen()
  moveTo(5, 20)
  redf("Hello")
  time.Sleep(10 * time.Second)
}

func moveTo(n int, m int) {
  fmt.Printf("\x1b[%d;%dH", n, m)
}

func moveToCol (n int) {
  fmt.Printf("\x1b[%dG")
}

func redf(s string) {
  fmt.Printf("%s%s%s\n", "\033[31m", "hello", "\033[0m")
}

func scrollUp(n int) {
  fmt.Printf("\x1b[%dS", n)
}

func scrollDown(n int) {
  fmt.Printf("\x1b[%dT", n)
}

func saveCursor() {
  fmt.Printf("\x1b[s")
}

func restoreCursor() {
  fmt.Printf("\x1b[u")
}

func clearScreen() {
  fmt.Printf("\x1b[2J")
}

func hideCursor() {
  fmt.Printf("\x1b[?25h")
}

func showCursor() {
  fmt.Printf("\x1b[?25l")
}

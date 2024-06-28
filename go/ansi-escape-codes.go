package main

import (
  "fmt"
)


func main() {
  redf("Hello")
}

func moveTo(n int, m int) {
  fmt.Printf("\x1b[%d;%dH", n, m)
}

func redf(s string) {
  fmt.Printf("%s%s%s\n", "\033[31m", "hello", "\033[0m")
}


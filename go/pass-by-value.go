package main

import "fmt"

type Player struct {
  name string
  score int
}

func addScore(p *Player) {
  p.score = p.score + 1
}

func (p *Player) addScoreMethod() {
  p.score = p.score + 1
}

func main() {
  player1 := Player{
    name: "Ritesh",
    score: 0,
  }
  fmt.Println(player1.name, player1.score)
  addScore(&player1) // Apparently structs are pass by value
  fmt.Println(player1.name, player1.score)
  player1.addScoreMethod()
  fmt.Println(player1.name, player1.score)
}



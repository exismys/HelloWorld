package main

import "fmt"

type Player struct {
	name  string
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
		name:  "Ritesh",
		score: 0,
	}
	fmt.Println(player1.name, player1.score) // Ritesh 0
	addScore(&player1)                       // Apparently structs are pass by value, so we need to pass the address of the struct
	fmt.Println(player1.name, player1.score) // Ritesh 1
	player1.addScoreMethod()                 // This is a method on the struct, so it is pass by reference
	fmt.Println(player1.name, player1.score) // Ritesh 2
}

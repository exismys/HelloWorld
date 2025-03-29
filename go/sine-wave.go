package main

import (
	"fmt"
	"math"
)

const nsamps = 50

func generate() {
	tau := math.Pi * 2
	var angle float64 = tau / nsamps
	for i := 0; i < nsamps; i++ {
		samp := math.Sin(angle * float64(i))
		fmt.Printf("%.8f\n", samp)
	}
}

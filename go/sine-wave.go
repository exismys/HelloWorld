package main

import (
	"fmt"
	"math"
)

const nsamps = 50

// This generates a sine value of 50 points between 0 and 2 * pi radians, equally spaced.

func generate() {
	tau := math.Pi * 2
	var angle float64 = tau / nsamps
	for i := 0; i < nsamps; i++ {
		samp := math.Sin(angle * float64(i))
		fmt.Printf("%.8f\n", samp)
	}
}

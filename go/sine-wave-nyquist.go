package main

import (
	"fmt"
	"math"
	"time"

	"github.com/ebitengine/oto/v3"
)

const (
	sampleRate = 44100
	frequency  = 440 // A4
	duration   = 2
	volume     = 0.2
)

func generateNyquist() {
	op := &oto.NewContextOptions{}
	op.SampleRate = 44100
	op.ChannelCount = 2
	op.Format = oto.FormatSignedInt16LE

	context, ready, err := oto.NewContext(op)
	if err != nil {
		panic(err)
	}
	<-ready
	player := context.NewPlayer()

	tau := math.Pi * 2
	nsamps := duration * sampleRate
	for i := 0; i < nsamps; i++ {
		angle := tau * frequency * float64(i) / sampleRate
		sample := int16(math.Sin(angle) * math.MaxInt16 * volume)
		buf := []byte{byte(sample), byte(sample >> 8)}
		_, err := player.Write(buf)
		if err != nil {
			fmt.Println("Error writing to player: ", err)
			break
		}
	}

	time.Sleep(time.Second * 2)
	player.Close()
	context.Close()
}

package main

import (
	"bytes"
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

func generateNyquistSample() []byte {
	tau := math.Pi * 2
	nsamps := duration * sampleRate
	audioData := make([]byte, 0, nsamps*2)
	for i := 0; i < nsamps; i++ {
		angle := tau * frequency * float64(i) / sampleRate
		sample := int16(math.Sin(angle) * math.MaxInt16 * volume)
		buf := []byte{byte(sample), byte(sample >> 8)}
		audioData = append(audioData, buf...)
	}
	return audioData
}

func play() {
	op := &oto.NewContextOptions{}
	op.SampleRate = sampleRate
	op.ChannelCount = 2
	op.Format = oto.FormatSignedInt16LE

	context, ready, err := oto.NewContext(op)
	if err != nil {
		panic(err)
	}
	<-ready
	audioData := generateNyquistSample()
	// fmt.Println(audioData)
	// fmt.Println(len(audioData))
	audioReader := bytes.NewReader(audioData)
	player := context.NewPlayer(audioReader)
	defer player.Close()
	player.Play()
	time.Sleep(time.Second * 2)
}

func main() {
	play()
}

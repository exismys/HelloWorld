package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	produce()

	var config *kafka.ConfigMap
	if saslPassword == "" {
		config = &kafka.ConfigMap{
			"bootstrap.servers":  broker,
			"group.id":           "read-only-consumer",
			"enable.auto.commit": false,
			"auto.offset.reset":  "earliest",
		}
	} else {
		config = &kafka.ConfigMap{
			"bootstrap.servers":  broker,
			"group.id":           "read-only-consumer",
			"security.protocol":  "SASL_PLAINTEXT",
			"sasl.mechanisms":    "PLAIN",
			"sasl.username":      username,
			"sasl.password":      saslPassword,
			"enable.auto.commit": false,
			"auto.offset.reset":  "earliest",
		}
	}

	c, err := kafka.NewConsumer(config)

	if err != nil {
		panic(err)
	}

	err = c.SubscribeTopics([]string{topic}, nil)
	if err != nil {
		panic(err)
	}

	fmt.Println("Consuming messages (read-only)...")

	sigchan := make(chan os.Signal, 1)
	signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)

	run := true
	for run {
		select {
		case sig := <-sigchan:
			fmt.Printf("Caught signal %v: terminating\n", sig)
			run = false
		default:
			msg, err := c.ReadMessage(-1)
			if err == nil {
				fmt.Printf("Received: %s\n", string(msg.Value))
			} else {
				fmt.Fprintf(os.Stderr, "Error reading message: %v\n", err)
			}
		}
	}

	fmt.Println("Closing consumer...")
	c.Close()
}

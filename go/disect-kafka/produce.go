package main

import (
	"fmt"
	"log"
	"time"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func produce() {
	var config *kafka.ConfigMap
	if saslPassword == "" {
		config = &kafka.ConfigMap{
			"bootstrap.servers": broker,
		}
	} else {
		config = &kafka.ConfigMap{
			"bootstrap.servers": broker,
			"security.protocol": "SASL_PLAINTEXT",
			"sasl.mechanisms":   "PLAIN",
			"sasl.username":     username,
			"sasl.password":     saslPassword,
		}
	}

	producer, err := kafka.NewProducer(config)
	if err != nil {
		log.Fatalf("Error creating producer: %v\n", err)
	}
	defer producer.Close()
	currentTime := time.Now()
	message := "Hello, Kafka! - " + currentTime.Format("15:04:05")

	// Create a Kafka message
	msg := &kafka.Message{
		TopicPartition: kafka.TopicPartition{
			Topic:     &topic,
			Partition: kafka.PartitionAny,
		},
		Value: []byte(message),
	}

	// Produce the message asynchronously
	err = producer.Produce(msg, nil)
	if err != nil {
		log.Fatalf("Error producing message: %v\n", err)
	}

	fmt.Printf("Message produced: %s\n", message)

	// Wait for all messages to be delivered
	producer.Flush(15 * 1000)
}

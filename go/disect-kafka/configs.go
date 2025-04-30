package main

import "os"

var topic string = "dummy-topic"
var broker string = os.Getenv("KAFKA_BROKER") // In IP:PORT format
var username string = os.Getenv("KAFKA_USER")
var saslPassword = os.Getenv("KAFKA_SASL_PASSWORD")

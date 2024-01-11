terraform {
  required_providers {
    kafka = {
      source = "Mongey/kafka"
      version = "0.5.4"
    }
  }
}

provider "kafka" {
  bootstrap_servers = ["localhost:9092"]
  tls_enabled = false
}

resource "kafka_topic" "logs" {
  name               = "systemd_logs"
  replication_factor = 1
  partitions         = 1

  config = {
    "segment.ms"     = "20000"
    "cleanup.policy" = "compact"
  }
}
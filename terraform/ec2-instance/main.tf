terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "ap-south-1"
  profile = "my-aws"
}

resource "aws_instance" "ec2-terraform-demo" {
  ami           = "ami-0287a05f0ef0e9d9a"
  instance_type = "t2.micro"

  tags = {
    Name = "ec2-terraform-demo"
  }
}

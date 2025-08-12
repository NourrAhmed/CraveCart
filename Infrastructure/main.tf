provider "aws" {
  region = var.region
}
# KMS key for encryption
resource "aws_kms_key" "mykey" {
  description             = "KMS key for Terraform state encryption"
  deletion_window_in_days = 10
}

# S3 bucket for storing Terraform state
resource "aws_s3_bucket" "StateFileBucket" {
  bucket = "state-bucket" 

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.mykey.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }
}

# Block public access
resource "aws_s3_bucket_public_access_block" "block" {
  bucket                  = aws_s3_bucket.StateFileBucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable versioning
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.StateFileBucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# DynamoDB table for state locking
resource "aws_dynamodb_table" "StateLock" {
  name         = "stateLock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

resource "aws_instance" "CraveCart" {
  ami           = var.instance_ami
  instance_type = var.instance_type
  tags = {
    "Name" = "EC2Instance"
  }
  security_groups = [aws_security_group.sg.name]
  key_name        = aws_key_pair.CraveCart_KeyPair.key_name
  user_data       = <<-EOF
               #!/bin/bash
                sudo apt update -y
                sudo apt install docker.io -y
                sudo apt install docker-compose -y
                sudo apt install git -y
                sudo systemctl start docker
                sudo usermod -aG docker ubuntu
                sleep 30
               
                git clone https://github.com/NourrAhmed/CraveCart.git 
                cd CraveCart
                sudo docker-compose up -d
              EOF
}

resource "aws_security_group" "sg" {
  name = "CraveCart security group"
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "Frontend app"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "Backend API"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

}
resource "aws_key_pair" "CraveCart_KeyPair" {
  key_name   = "CraveCart_KeyPair"
  public_key = tls_private_key.rsa.public_key_openssh

}

resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "CraveCart" {
  content  = tls_private_key.rsa.private_key_pem
  filename = "CraveCartKey.pem"
}


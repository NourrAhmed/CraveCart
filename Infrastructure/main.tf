provider "aws" {
  region = var.region
}


resource "aws_instance" "CraveCart_blue" {
  ami           = var.instance_ami
  instance_type = var.instance_type
  tags = { "Name" = "CraveCart-Blue" }
  security_groups = [aws_security_group.sg.name]
  key_name        = aws_key_pair.CraveCart_KeyPair.key_name
  subnet_id     = aws_subnet.public_subnet_a.id
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

resource "aws_instance" "CraveCart_green" {
  ami           = var.instance_ami
  instance_type = var.instance_type
  tags = { "Name" = "CraveCart-Green" }
  security_groups = [aws_security_group.sg.name]
  key_name        = aws_key_pair.CraveCart_KeyPair.key_name
  subnet_id     = aws_subnet.public_subnet_b.id
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
  vpc_id = aws_vpc.main.id
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
# Create VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
}

resource "aws_subnet" "public_subnet_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "eu-north-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public_subnet_b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "eu-north-1b"
  map_public_ip_on_launch = true
}


# Create Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}


resource "aws_lb" "app_lb" {
  name               = "cravecart-lb"
  internal           = false
  load_balancer_type = "application"
  subnets            = [
    aws_subnet.public_subnet_a.id, # AZ1
    aws_subnet.public_subnet_b.id  # AZ2
  ]
  security_groups    = [aws_security_group.sg.id]
}

resource "aws_lb_target_group" "blue" {
  name     = "blue-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

resource "aws_lb_target_group" "green" {
  name     = "green-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.app_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = var.active_env == "blue" ? aws_lb_target_group.blue.arn : aws_lb_target_group.green.arn
  }
}

resource "aws_lb_target_group_attachment" "blue_instance" {
  target_group_arn = aws_lb_target_group.blue.arn
  target_id        = aws_instance.CraveCart_blue.id
  port             = 80
}

resource "aws_lb_target_group_attachment" "green_instance" {
  target_group_arn = aws_lb_target_group.green.arn
  target_id        = aws_instance.CraveCart_green.id
  port             = 80
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_subnet_a.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_subnet_b.id
  route_table_id = aws_route_table.public_rt.id
}

# KMS key for encryption
#resource "aws_kms_key" "mykey" {
#  description             = "KMS key for Terraform state encryption"
#  deletion_window_in_days = 10
#}

# S3 bucket for storing Terraform state
#resource "aws_s3_bucket" "CraveCartStateFileBucket" {
#  bucket = "cravecart-state-bucket" 
#}

#resource "aws_s3_bucket_server_side_encryption_configuration" "StateFileBucket" {
#  bucket = aws_s3_bucket.CraveCartStateFileBucket.id

#  rule {
#    apply_server_side_encryption_by_default {
#      kms_master_key_id = aws_kms_key.mykey.arn
#      sse_algorithm     = "aws:kms"
#    }
#  }
#}
# Block public access
#resource "aws_s3_bucket_public_access_block" "block" {
#  bucket                  = aws_s3_bucket.CraveCartStateFileBucket.id
#  block_public_acls       = true
#  block_public_policy     = true
#  ignore_public_acls      = true
#  restrict_public_buckets = true
#}

# Enable versioning
#resource "aws_s3_bucket_versioning" "versioning" {
#  bucket = aws_s3_bucket.CraveCartStateFileBucket.id
#  versioning_configuration {
#    status = "Enabled"
#  }
#}

# DynamoDB table for state locking
#resource "aws_dynamodb_table" "CraveCartStateLock" {
#  name         = "cravecartstateLock"
#  billing_mode = "PAY_PER_REQUEST"
#  hash_key     = "LockID"

#  attribute {
#    name = "LockID"
#    type = "S"
#  }
#}

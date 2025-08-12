terraform {
  backend "s3" {
    bucket         = "nour-terraform-state-bucket"
    key            = "terraform.tfstate"
    region = "eu-north-1"
    dynamodb_table = "stateLock"
    encrypt        = true
  }
}

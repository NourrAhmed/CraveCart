terraform {
  backend "s3" {
    bucket         = "nour-terraform-state-bucket"
    key            = "terraform.tfstate"
    region = var.region
    dynamodb_table = "stateLock"
    encrypt        = true
  }
}

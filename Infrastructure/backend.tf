#terraform {
#  backend "s3" {
#    bucket         = "cravecart-state-bucket"
#    key            = "terraform.tfstate"
#    region = "eu-north-1"
#    dynamodb_table = "cravecartstateLock"
#    encrypt        = true
#  }
#}
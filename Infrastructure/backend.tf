#terraform {
  #backend "s3" {
    #bucket         = "state-bucket"
    #key            = "terraform.tfstate"
    #region = "eu-north-1"
    #dynamodb_table = "stateLock"
    #encrypt        = true
  #}
#}
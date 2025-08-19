#output "instance_ip" {
#  value = aws_instance.CraveCart.public_ip
#}
#output "bucket_name" {
#  value = aws_s3_bucket.CraveCartStateFileBucket.bucket
#}
#output "dynamodb_table_name" {
#  value = aws_dynamodb_table.CraveCartStateLock.name
#}
output "blue_ip" {
  value = aws_instance.CraveCart_blue.public_ip
}

output "green_ip" {
  value = aws_instance.CraveCart_green.public_ip
}

output "active_env" {
  value = var.active_env
}
output "pemFile"{
  value = "CraveCartKey.pem"
  sensitive = true
}

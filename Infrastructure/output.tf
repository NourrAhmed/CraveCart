output "instance_ip" {
  value = aws_instance.CraveCart.public_ip
}
output "bucket_name" {
  value = aws_s3_bucket.CraveCartStateFileBucket.bucket
}
output "dynamodb_table_name" {
  value = aws_dynamodb_table.CraveCartStateLock.name
}
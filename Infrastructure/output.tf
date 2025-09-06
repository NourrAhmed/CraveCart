#output "instance_ip" {
#  value = aws_instance.CraveCart.public_ip
#}
#output "bucket_name" {
#  value = aws_s3_bucket.CraveCartStateFileBucket.bucket
#}
#output "dynamodb_table_name" {
#  value = aws_dynamodb_table.CraveCartStateLock.name
#}
#output "blue_ip" {
#  value = aws_instance.CraveCart_blue.public_ip
#}

#output "green_ip" {
#  value = aws_instance.CraveCart_green.public_ip
#}

#output "active_env" {
#  value = var.active_env
#}
output "pemFile"{
  value     = abspath(local_file.CraveCart.filename)
  sensitive = true
}
output "alb_dns_name" {
  value = aws_lb.app_lb.dns_name
}
# Get a running Blue instance IP
data "aws_instances" "blue" {
  instance_tags = {
    "aws:autoscaling:groupName" = aws_autoscaling_group.blue.name
  }
  instance_state_names = ["running"]
}

output "blue_ip" {
  value = length(data.aws_instances.blue.public_ips) > 0 ? data.aws_instances.blue.public_ips[0] : null
}

# Get a running Green instance IP
data "aws_instances" "green" {
  instance_tags = {
    "aws:autoscaling:groupName" = aws_autoscaling_group.green.name
  }
  instance_state_names = ["running"]
}

output "green_ip" {
  value = length(data.aws_instances.green.public_ips) > 0 ? data.aws_instances.green.public_ips[0] : null
}

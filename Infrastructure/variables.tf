variable "region" {
  default = "eu-north-1"
}
variable "instance_ami" {
  default = "ami-042b4708b1d05f512"
}
variable "instance_type" {
  default = "t3.micro"
}
variable "active_env" {
  description = "Active environment for blue-green deployment"
  type        = string
  default = "blue"
}
variable "eks_node_instance_type" {
  description = "EC2 instance type for EKS worker nodes"
  type        = string
  default     = "t3.medium"
}

variable "eks_desired_size" {
  description = "Desired number of worker nodes"
  type        = number
  default     = 2
}

variable "eks_max_size" {
  description = "Maximum number of worker nodes"
  type        = number
  default     = 4
}

variable "eks_min_size" {
  description = "Minimum number of worker nodes"
  type        = number
  default     = 1
}


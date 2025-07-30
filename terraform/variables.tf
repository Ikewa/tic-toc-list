variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = " uksouth"
}

variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
  default     = "todo-lite-rg"
}

variable "acr_name" {
  description = "Azure Container Registry name"
  type        = string
  default     = "todolite1"
}

variable "app_service_plan_name" {
  description = "App Service Plan name"
  default     = "todo-lite-plan"
}

variable "frontend_app_name" {
  description = "Frontend Web App name"
  type        = string
  default     = "todo-lite-frontend-app"
}

variable "backend_app_name" {
  description = "Backend Web App name"
  type        = string
  default     = "todo-lite-frontend-app"
}


variable "frontend_port" {
  description = "Port your frontend container listens on"
  type        = string
  default     = "80"
}

variable "backend_port" {
  description = "Port your backend container listens on"
  type        = string
  default     = "5000"
}

variable "frontend_port_staging" {
  description = "Port for the staging frontend container"
  type        = string
  default     = "80"
}

variable "backend_port_staging" {
  description = "Port for the staging backend container"
  type        = string
  default     = "5000"
}

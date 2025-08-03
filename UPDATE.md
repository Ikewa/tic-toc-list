##  Phase 1: Initial Project Deployment

### 🔹 1. Containerization
- Efficient `Dockerfile` created for the full-stack application
- `docker-compose.yml` used to manage multi-container setup (frontend, backend, MySQL)

### 🔹 2. Infrastructure as Code (IaC)
- All required cloud resources defined using Terraform:
  - Azure Container Registry (ACR)
  - Azure App Service (Linux container)
  - Azure MySQL flexible server
  - Networking and container groups

### 🔹 3. Manual Cloud Deployment
- Docker image built and pushed to ACR manually using CLI
- Initial deployment performed manually through Azure portal
- Application hosted at a publicly accessible production URL

---

##  Phase 2: Extended DevOps Implementation

### 🔹 1. Continuous Deployment (CD)
- CI pipeline extended to full CD with GitHub Actions
- All manual steps now fully automated:
  - `docker build` → `docker push` → deploy to Azure App Service
- Pipeline triggers on every merge to `main` branch
- Includes stages for:
  - Code build
  - Unit testing
  - Security scanning
  - Docker image deployment
  - Live production deployment

### 🔹 2. DevSecOps Integration
- Security implemented at each pipeline stage:
  - `npm audit` used for dependency vulnerability scanning
  - `trivy` container scanning integrated in CI/CD
- Scan results logged and reported in CI logs
- Fixes applied to remove or upgrade vulnerable packages

### 🔹 3. Monitoring & Observability
- Azure Monitor configured for App Service logging
- Alerts set to notify on deployment failures or downtimes
- Custom logging implemented in Node.js backend
- One operational alert actively monitoring HTTP failures

---

##  Phase 3: Release Management

### 🔹 CHANGELOG.md
- Maintains version history with semantic versioning
- Records all changes using Conventional Commits
- Documents feature additions, changes, and deployments

---

##  Project Management

###  Peer Review
- Participated in Pull Request review with another student
- Incorporated PR feedback and provided detailed code feedback

###  GitHub Project Board
- Actively used to manage tasks and track progress
- Issues and cards linked to commits and PRs

## Live URL:
https://tic-toc-frontend.azurewebsites.net/


## Video link
https://youtu.be/1gk6TkIBADY?si=5sbyGCy61jSerLpD
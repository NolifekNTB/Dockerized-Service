# Dockerized Node.js Service Deployment

The goal of this project is to dockerize a simple Node.js service and deploy it to a remote Linux server using GitHub Actions.

Project task: [roadmap.sh Dockerized Service Deployment](https://roadmap.sh/projects/dockerized-service-deployment?utm_source=chatgpt.com)

---

# Part 1: Creating a Node.js Service

## 1.1 Project Structure

```bash
Dockerized-Service/
│
├── app.js
├── package.json
├── .env           # Stored on remote server
├── .gitignore
└── Dockerfile
```

## 1.2 Test Service Locally

Install dependencies:

```bash
npm install
```

Start the service:

```bash
npm start
```

---

# Part 2: Dockerizing the Node.js Service

## 2.1 Create Dockerfile

Create a Dockerfile for the Node.js application.

## 2.2 Build Docker Image

```bash
docker build -t node-service .
```

## 2.3 Run Docker Container Locally

```bash
docker run --env-file .env -p 3000:3000 node-service
```

---

# Part 3: Setting Up a Remote Linux Server

Update system packages:

```bash
sudo apt update && sudo apt upgrade -y
```

Install Docker:

```bash
sudo apt install docker.io -y
```

Enable and start Docker:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Verify Docker installation:

```bash
docker --version
```

---

# Part 4: Deploying with GitHub Actions

## 4.1 Configure GitHub Secrets

Add the following repository secrets:

* `GHCR_TOKEN`
* `SSH_KEY`
* `TARGET_HOST`
* `USERNAME`

### Secret Descriptions

* **GHCR_TOKEN** → GitHub token with `read:packages` permission for pulling Docker images from GHCR.
* **SSH_KEY** → Private SSH key used for connecting to the remote server.
* **TARGET_HOST** → Remote server IP address or hostname.
* **USERNAME** → SSH username for remote access.

## 4.2 Create GitHub Workflow

The GitHub Actions workflow should:

1. Build the Docker image
2. Push the image to GitHub Container Registry (GHCR)
3. Connect to the remote server over SSH
4. Pull the latest Docker image
5. Run the container on the server

---

# Part 5: Testing Deployment

After deployment, verify the service is accessible:

```bash
http://<SERVER_IP>:80
http://<SERVER_IP>:80/secret
```

---

# Tech Stack

* Node.js
* Docker
* GitHub Actions
* GitHub Container Registry (GHCR)
* Linux Server (Ubuntu)

---

# Learning Outcomes

This project covers:

* Creating a simple Node.js service
* Dockerizing an application
* Working with Docker images and containers
* Using GitHub Container Registry
* Deploying to a remote Linux server
* Automating deployments with GitHub Actions

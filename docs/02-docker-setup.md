# Docker Setup Guide

This document explains how to run the NestJS API in Docker.

## 🧱 1. Build the Image
```bash
docker compose build
```

## 🚀 2. Start the Container
```bash
docker compose up -d
```

## 🧾 3. Verify the Container
```bash
docker ps
```
You should see a container named `pgasgis-api` running.

## 🔍 4. Check Logs
```bash
docker logs -f pgasgis-api
```

## 🧠 5. Access the API
Visit:
```
http://localhost:8989
```

## ⚕️ 6. Health Check
Check the service health:
```
http://localhost:8989/health
```

## 🧹 7. Stop and Remove Containers
```bash
docker compose down
```

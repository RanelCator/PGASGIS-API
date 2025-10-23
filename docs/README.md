# PGASGIS-API

**PGASGIS-API** is a backend API built with **NestJS** and **TypeScript**, designed to support the PGAS GIS system.  
It handles user authentication, project management, geospatial layers, and other related entities.

---

## Features

- **JWT Authentication** (Login, Guard, and Strategy)
- **Layer and Geometry Management**
- **CRUD APIs** for project-related entities
- **DTO-based validation** using `class-validator` and `class-transformer`
- **Environment-based configuration**
- **Swagger API documentation**
- **MongoDB** integration
- **Microsoft SQL Server** integration with Windows or SQL authentication


---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/RanelCator/PGASGIS-API.git
cd PGASGIS-API
npm install
```

---

## Environment Variables

Create a .env file in the root directory:


```bash
PORT=3000

# Database configuration
SQLSERVER_HOST=
SQLSERVER_DB=
SQLSERVER_USER=
SQLSERVER_PASS=
SQLSERVER_DOMAIN=

# JWT secret
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=
```

---

## API Documentation (Swagger)

Once the app is running, open:

```bash
http://localhost:3000/api
```

You’ll find interactive API documentation generated with **Swagger**.

## Building the Project
Before deploying or serving, build the app:

```bash
npm run build
```


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

## Environment Variables

Create a .env file in the root directory:


```bash
PORT=3000

# Database configuration
SQLSERVER_HOST=VM_DB_PMIS.pgas.ph
SQLSERVER_DB=spms
SQLSERVER_USER=PGAS\juan.delacruz
SQLSERVER_PASS=admin123
SQLSERVER_DOMAIN=PGAS

# JWT secret
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```
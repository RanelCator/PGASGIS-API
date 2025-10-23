# IIS Setup for Dockerized NestJS API

## 🏗 1. Purpose
You’ll use IIS as a **reverse proxy** to expose your Docker NestJS API to the internet (e.g., `http://api.pgas.ph/gis`).

## ⚙️ 2. Prerequisites
- Docker is installed and container is running.
- IIS is installed on Windows.
- The following IIS modules are installed:
  - **URL Rewrite**
  - **Application Request Routing (ARR)**

## 🧭 3. Create Reverse Proxy Rule
1. Open **IIS Manager**.
2. Select **Default Web Site** → Click **URL Rewrite**.
3. Add **Reverse Proxy Rule**.
4. In **Inbound Rules**, add:
   ```
   Requested URL: Matches the Pattern
   Using: Regular Expressions
   Pattern: ^gis/(.*)
   ```
5. Click **Action** → **Rewrite URL** →  
   ```
   http://localhost:8989/{R:1}
   ```
6. Enable **ARR Proxy**:
   - Go to *Application Request Routing Cache → Server Proxy Settings* → Enable Proxy.

## 🧪 4. Test
Visit:
```
http://api.pgas.ph/gis/health
```
You should see the health JSON response.

## 🧹 5. Troubleshooting
- **Port conflicts** → Ensure `8989` isn’t used by another service.
- **CORS issues** → Add CORS handling inside your Nest app or through IIS.

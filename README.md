🗺️ PGASGIS API

A modular, scalable NestJS backend for the PGASGIS project — designed to manage geospatial layers, projects, attributes, and hierarchical data structures.

🚀 Features

Layer Management

Create and retrieve map layers with metadata and attributes

Search layers by layer_type

Project Management

Manage hierarchical menu_group → geometry_group → item structure

Move items within valid hierarchy levels

Attribute Management

Manage attributes under each project

Automatically replaces the AttributeChild[] content on update

JWT Authentication

Secure endpoints using JSON Web Tokens (JWT)

Consistent API Responses

All endpoints return a standardized ApiResponse<T> format

🧩 Tech Stack
Component	Technology
Framework	NestJS

Language	TypeScript
Database	MongoDB (via Mongoose)
Validation	class-validator / class-transformer
API Docs	Swagger (via @nestjs/swagger)
Deployment	IIS (Windows) or NodeJS service
Version Control	Git + GitHub
🏗️ Project Structure
src/
├── auth/                # JWT authentication and strategies
├── common/
│   └── dto/
│       └── api-response.dto.ts  # Standard response format
├── layers/
│   ├── dto/
│   │   └── create-layer.dto.ts
│   ├── layers.controller.ts
│   └── layers.service.ts
├── project/
│   ├── dto/
│   │   ├── create-project.dto.ts
│   │   ├── move-item.dto.ts
│   │   └── create-attribute.dto.ts
│   ├── project.controller.ts
│   ├── project.service.ts
│   └── schemas/
│       └── project.schema.ts
└── main.ts               # Application entry point

📘 Standard API Response

All endpoints return a unified response format:

export class ApiResponse<T = any> {
  message: string;
  success: boolean;
  data?: T;

  constructor(init?: Partial<ApiResponse<T>>) {
    Object.assign(this, init);
  }
}

Example:
{
  "message": "Layer created successfully",
  "success": true,
  "data": {
    "id": "6705bce3df29c925da876b13"
  }
}

🧠 DTO Overview
Layer DTO (CreateLayerDto)

Handles both layer metadata and attribute styling:

layer: information like description, remarks, layer_type, date

attribute: visual styling + labels + groupings

Project Schema Hierarchy
Project
└── menu_group[]
    └── geometry_group[]
        └── items[]
            └── attributeChild[]

Move Item Rule

Items can only be moved within the same level or to a higher level

Example: ✅ move Item 3 under Item 6, ❌ cannot move under a child like Item 7

⚙️ Environment Variables

Create a .env file in your project root:

PORT=3000
MONGO_URI=mongodb://localhost:27017/pgasgis
JWT_SECRET=your-secret-key

🧪 Development
1. Install dependencies
npm install

2. Run development server
npm run start:dev

3. Build for production
npm run build

4. Start production server
npm run start:prod

📚 Swagger API Documentation

After running the app, open your browser at:

http://localhost:3000/api


You’ll see the full interactive Swagger UI with:

@ApiTags, @ApiOperation, and @ApiParam documentation

Real-time try-it-out requests

🖥️ Deploying to IIS
1. Build the project
npm run build

2. Copy files to your IIS web directory

Copy the following:

dist/
package.json
package-lock.json
.env

3. Install production dependencies
npm ci --omit=dev

4. Create IIS Application

Create a new site or app under Default Web Site

Point Physical Path to your build folder

Configure Application Pool to use No Managed Code

Add node.exe path to your environment

Set your app entry:

node dist/main.js

5. Restart the Application (if updated)

If you push new changes:

Rebuild with npm run build

Replace the /dist folder

Restart the application under IIS (no need to restart IIS itself)

🧩 Git Workflow
Initialize and push
git init
git remote add origin https://github.com/RanelCator/PGASGIS-API.git
git branch -M main
git pull origin main --allow-unrelated-histories
git add .
git commit -m "Initial commit"
git push -u origin main

📦 Notes

dist/ is excluded from Git via .gitignore

You can force include it when deploying manually:

git add dist -f


API always returns standardized ApiResponse for consistent frontend handling

👨‍💻 Author

Ranel Cator
PGASGIS API Developer
📧 ranel.cator@pgas.ph

🧾 License

This project is licensed under the MIT License.
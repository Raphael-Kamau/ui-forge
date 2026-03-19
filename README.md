# UI Forge
UI Forge is a full‑stack platform for discovering, testing, and managing reusable UI snippets. It combines a React + Vite frontend with a Node.js + Express + MongoDB backend, providing authentication, snippet search, and support features. 
- You can view the live demo of the site here: https://ui-forge-pihg.vercel.app

<img width="1213" height="668" alt="image" src="https://github.com/user-attachments/assets/28bf6909-da19-4cce-9fd6-a1cd46841a4c" />

- The backend is deployed on Render: https://ui-forge-1.onrender.com/
![alt text](image-3.png)

## 🌍 UI Forge and the UN Sustainable Development Goals (SDGs)
UI Forge is more than a snippet library — it’s a platform that empowers developers, educators, and communities to build scalable solutions.

SDG 4: Quality Education
Provides open access to reusable UI snippets and clear documentation.

Helps students, educators, and self‑learners accelerate their projects without reinventing the wheel.

## ✨ Features
🔐 Authentication: Register, login, and manage sessions with JWT.
![register](image-5.png)
![login](image-4.png)

📚 Snippet Library: Search and filter UI snippets by category, framework, and tags.
![snippet](image-6.png)

🛠️ Support System: Submit feedback or issues directly from the frontend.
![support](image-7.png)

⚡ Modern Stack: React, Vite, TailwindCSS, Node.js, Express, MongoDB.

🧩 Centralized API Service: Axios service layer for clean frontend requests.

🩺 Health Check: /api/health endpoint to verify backend connectivity.

## 📂 Project Structure
Code
ui-forge/
├── client/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level views (Home, Login, Register)
│   │   ├── services/     # API service layer (api.ts)
│   │   └── context/      # AuthContext for global state
│   └── .env.example      # Example environment variables for frontend
├── server/               # Backend (Node.js + Express)
│   ├── index.js          # Entry point
│   ├── models/           # Mongoose models (User, Snippet)
│   ├── routes/           # Express routes (auth, snippets, support)
│   ├── seed.js           # Seeder script for snippets and users
│   ├── .env              # Environment variables (not committed)
│   └── .env.example      # Example environment variables for backend
└── README.md
## ⚙️ Setup
```
1. Clone the repository
bash
git clone https://github.com/your-username/ui-forge.git
cd ui-forge
2. Backend setup
bash
cd server
npm install
Create .env from .env.example:

Code
PORT=5000
MONGO_URI=mongodb://localhost:27017/uiforge
JWT_SECRET=supersecretkey123
CLIENT_URL=http://localhost:5173
Run backend:

bash
npm run dev
3. Frontend setup
bash
cd client
npm install
Create .env from .env.example:

Code
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=UI Forge
Run frontend:

bash
npm run dev
```
## 🚀 Backend Deployment on Render
If you're deploying the backend to Render, use the following settings:

Field	Value
Root Directory	server
Build Command	npm install
Start Command	npm start
Make sure your server/package.json includes:

json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
And your .env file is placed inside server/.

## 🧪 Testing
Health Check
Visit: http://localhost:5000/api/health Expected response:

json
{ "status": "ok", "message": "UI Forge backend is running 🚀" }
Auth
Register: POST /api/auth/register

Login: POST /api/auth/login

## 🤝 Contributing
Fork the repo

Create a feature branch

bash
git checkout -b feature/my-feature
Commit changes

bash
git commit -m "Add my feature"
Push branch

bash
git push origin feature/my-feature
Open a Pull Request

## 📜 License
MIT License © 2025 UI Forge Contributor

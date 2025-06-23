# 🛠️ DaarutTahseen Backend API

This is the backend server for the DaarutTahseen LMS project.  
It is built with **Node.js**, **Express.js**, and **PostgreSQL**, with a clean, beginner-friendly code structure.

---

## 🚀 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **PostgreSQL** – Relational database (Dockerized)
- **Prisma ORM** – Type-safe DB access
- **Nodemon** – Auto-reload during development
- **Dotenv** – For managing environment variables

---

## 📁 Folder Structure

```
dt-backend/
├── prisma/
│   ├── schema.prisma          # Prisma schema
│   ├── seed.js                # Seed script
│   └── migrations/            # Prisma migrations
├── src/
│   ├── config/
│   │   ├── db.js              # Prisma client setup
│   │   └── env.js             # dotenv config
│   ├── controllers/
│   │   └── user.controller.js # User route handlers
│   ├── routes/
│   │   └── user.routes.js     # Express Router
│   ├── middleware/
│   │   └── errorHandler.js    # Simple error middleware
│   ├── utils/
│   │   └── response.js        # Helper to send responses
│   ├── app.js                 # Express app instance
├── index.js                   # Server entry point
├── .env                       # Environment variables
├── docker-compose.yaml        # Only runs Postgres
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/DaarutTahseen25/dt-backend.git
cd dt-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/dt_db
```

> Ensure this URL matches the settings inside `docker-compose.yaml`

---

## 🐳 Run PostgreSQL Database with Docker

```bash
npm run docker:up
```

This spins up only the **Postgres database** container with:

- Username: `postgres`
- Password: `postgres`
- DB name: `dt_db`

---

## ▶️ Run the Server Locally

```bash
# For development
npm run dev

# For production-like start
npm start
```

Server should now be running at:  
📍 `http://localhost:5000`

---

## 🧪 Sample Routes

```http
GET     /api/health       # Health check
GET     /api/students     # List students
POST    /api/teachers     # Add new teacher
```

Test your API using **Postman**, **Thunder Client**, or **Insomnia**.

---

## ✍️ Contribution Guide

- Use clear, modular folder structure
- Write one controller per resource (e.g., `user.controller.js`)
- Validate request body before hitting DB
- Use async/await, and handle errors gracefully
- Ask the team or consult the docs if unsure!

---

## 📌 To-Do / Feature List

- [ ] Student & Teacher CRUD
- [ ] JWT Authentication
- [ ] Class & Subject Management
- [ ] Upload PDFs or Audio (File uploads)
- [ ] Admin Routes & Role Permissions

---

## 🕋 Project Vision

This backend powers the Qur'an and Madrasah LMS of DaarutTahseen.  
Our goal is to support Islamic learning with structure, clarity, and technology — *bi'idhnillāh*.

**May Allah accept it from us all. Āmīn.**

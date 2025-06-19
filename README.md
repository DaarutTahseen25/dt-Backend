# 🛠️ DaarutTahseen Backend API

This is the backend server for the DaarutTahseen LMS project.  
It is built with **Node.js**, **Express.js**, and **PostgreSQL**, with clean code structure and beginner-friendly setup.

---

## 🚀 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **PostgreSQL** – Relational database
- **Knex.js / Prisma** (optional) – For DB query building/ORM
- **Nodemon** – Auto-reload during development
- **Dotenv** – For managing environment variables

---

## 📁 Folder Structure

```
daarut-backend/
├── src/
│   ├── controllers/     # Request handlers (logic)
│   ├── routes/          # API route definitions
│   ├── models/          # Database logic (SQL or ORM)
│   ├── config/          # DB config and env setup
│   ├── middleware/      # Custom middlewares
│   └── app.js           # Main express app
├── index.js             # Entry point
├── .env                 # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/DaarutTahseen25/daarut-backend.git
cd daarut-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/daarut_db
```

> Replace with your actual PostgreSQL credentials.

### 4. Run the Server

```bash
# For development
npm run dev

# Or normal start
npm start
```

Server should be running at:  
📍 `http://localhost:5000`

---

## 🧪 Sample Routes

```http
GET     /api/health       # Health check
GET     /api/students     # List students
POST    /api/teachers     # Add new teacher
```

You can test endpoints using tools like **Postman** or **Insomnia**.

---

## ✍️ Contribution Guide

- Keep code clean and modular
- Use async/await for DB and I/O
- Create one controller per resource (e.g., `studentsController.js`)
- Validate input before saving to DB
- Ask questions freely if stuck!

---

## 📌 To-Do / Features

- [ ] Student & Teacher CRUD
- [ ] Authentication (JWT)
- [ ] Class & Subject Management
- [ ] File Uploads (PDF, Audio)
- [ ] Admin Routes

---

## 🕋 Purpose

This backend powers the Qur'an and Madrasah LMS for DaarutTahseen.  
Our goal is to make Islamic learning more structured, accessible, and efficient — bi'idhnillāh.

**May Allah accept it from all of us. Āmīn.**
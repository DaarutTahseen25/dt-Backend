import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { app, server } from "./socket/socket.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 9000;

connectDB();


app.use(express.json());
app.use(cookieParser());

// Configure CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://daarut-tahseen25-git-dev-daaruttahseen-institution-s-projects.vercel.app",
  "https://daarut-tahseen25-git-dev-dt-institution.vercel.app/"

];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/v1/auth", authRoutes);




server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

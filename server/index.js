// server/index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

// CONNECT TO DATABASE
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// MIDDLEWARES
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("CAMPUS-CONNECT BACKEND IS RUNNING PERFECTLY");
});

// ALL API ROUTES WITH CONSISTENT /api PREFIX
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/events", eventRoutes); 
app.use("/api/files",fileRoutes);      
app.use("/api/posts",postRoutes);
app.use("/api/notifications", notificationRoutes);

import fs from "fs";
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// OPTIONAL: Fake user for future auth (safe to keep)
app.get("/api/auth/me", (req, res) => {
  res.json({
    _id: "66f8a1b2c3d4e5f607182930",
    name: "Guest User",
    email: "guest@campus.com",
    role: "student"
  });
});

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`CAMPUS-CONNECT IS 100% LIVE AND WORKING`);
  console.log(`Events → http://localhost:${PORT}/api/events`);
  console.log(`Announcements → http://localhost:${PORT}/api/announcements`);
});
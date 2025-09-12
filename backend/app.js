// app.js
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import projectMemberRoutes from "./routes/projectMemberRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import companyMemberRoutes from "./routes/companyMemberRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import attachmentRoutes from "./routes/attachmentRoute.js"

const app = express();

// Needed for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder publicly
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/projectMembers", projectMemberRoutes);
app.use("/api/activityLog", activityLogRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/companyMembers", companyMemberRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attachments", attachmentRoutes);

export default app;
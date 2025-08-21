// index.js
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import projectMemberRoutes from "./routes/projectMemberRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // ✅ Needed to read cookies


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/projectMembers", projectMemberRoutes);
app.use("/api/activityLog", activityLogRoutes);


export default app;

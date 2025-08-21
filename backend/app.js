// index.js
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // ✅ Needed to read cookies


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


export default app;

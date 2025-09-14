import express from "express";
import { login, logout, refresh, register, me } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", authenticateToken, refresh);
router.post("/logout", logout);
router.get("/me", authenticateToken, me);

export default router;
import express from "express";
import {
  getProjectLogs,
  getTicketLogs,
  getUserLogs,
} from "../controllers/activityLogController.js";
import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.use(authenticateToken);

// Get all logs for a project
router.get("/project/:projectId", authMiddleware, getProjectLogs);

// Get all logs for a ticket
router.get("/ticket/:ticketId", authMiddleware, getTicketLogs);

// Get all logs by a user
router.get("/user/:userId", authMiddleware, getUserLogs);

export default router;
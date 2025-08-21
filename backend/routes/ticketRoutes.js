import express from "express";
import {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.use(authenticateToken);

// Create a ticket
router.post("/", createTicket);

// Get all tickets for a project
router.get("/:projectId", getTickets);

// Update a ticket
router.put("/:ticketId", updateTicket);

// Delete a ticket
router.delete("/:ticketId", deleteTicket);

export default router;
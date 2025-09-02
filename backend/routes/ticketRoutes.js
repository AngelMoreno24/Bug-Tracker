import express from "express";
import {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  getTicketDetails
} from "../controllers/ticketController.js";

import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.use(authenticateToken);

// Create a ticket
router.post("/", createTicket);

// Get all tickets for a project
router.get("/:projectId", getTickets);


// Get One tickets by Id
router.get("/:ticketId/details", getTicketDetails);

// Update a ticket
router.put("/:ticketId", updateTicket);

// Delete a ticket
router.delete("/:ticketId", deleteTicket);

export default router;
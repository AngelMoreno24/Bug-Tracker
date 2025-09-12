import express from "express";
import {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  getTicketDetails,
  getAssignedTicket
} from "../controllers/ticketController.js";

import { authenticateToken } from "../middleware/tokenAuthentication.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js"; 

const router = express.Router();

router.use(authenticateToken);

// Create a ticket
router.post("/", createTicket);

// Get all tickets for a project
router.get("/:projectId", getTickets);

// Get One tickets by Id
router.get("/:ticketId/details", getTicketDetails);

// Get assigned tickets for current user
router.get("/", getAssignedTicket);

// Update a ticket
router.put("/:projectId/:ticketId", authorizeRoles("Manager", "Admin"), updateTicket);

// Delete a ticket
router.delete("/:projectId/:ticketId", authorizeRoles("Manager", "Admin"), deleteTicket);

export default router;
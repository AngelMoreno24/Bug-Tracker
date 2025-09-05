import express from "express";
import {
  createComment,
  getComments,
  getUserComments,
  deleteComment,
} from "../controllers/commentController.js";

import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.use(authenticateToken);

// Create a comment
router.post("/", createComment);

// Get all comment for a ticket
router.get("/:ticketId", getComments);

// Get assigned comment for current user
router.get("/myComments", getUserComments);

// Delete a comment
router.delete("/:commentId", deleteComment);

export default router;
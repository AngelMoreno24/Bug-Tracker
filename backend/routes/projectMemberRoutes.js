import express from "express";
import { getProjectMembers } from "../controllers/projectMemberController.js";
import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.use(authenticateToken);

// Get all members in a project
router.get("/:projectId", getProjectMembers);

export default router;
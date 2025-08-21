import express from "express";
import { getProjectActivity } from "../controllers/activityLogController.js";
import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.use(authenticateToken);

// Get logs for a project
router.get("/:projectId", getProjectActivity);

export default router;
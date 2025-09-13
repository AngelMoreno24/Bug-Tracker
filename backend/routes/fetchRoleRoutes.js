import express from "express";

import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.use(authenticateToken);

// Get all members in a project
router.get("/:projectId/membership", async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  const membership = await ProjectMember.findOne({ projectId, userId });
  if (!membership) return res.status(404).json({ message: "Not a project member" });

  res.json({ role: membership.role });
});

export default router;
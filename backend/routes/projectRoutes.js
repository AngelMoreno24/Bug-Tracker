import express from "express";
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  addProjectMember,
  removeProjectMember,
} from "../controllers/projectController.js";

import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.use(authenticateToken);


router.get("/", getUserProjects);
router.get("/:id", getProjectById);

// (Manager only)
router.post("/", createProject);
router.put("/:id", updateProject);
router.post("/:id/members", addProjectMember);
router.delete("/:id/members", removeProjectMember);

export default router;
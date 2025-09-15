import express from "express";
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

import { authenticateToken } from "../middleware/tokenAuthentication.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authenticateToken);


router.get("/", getUserProjects);
router.get("/:id", getProjectById);

// (Manager/Admin only)
router.post("/", authorizeRoles("Manager", "admin"), createProject);
router.put("/:id", authorizeRoles("Manager", "admin"), updateProject);
router.delete("/:id", authorizeRoles("Manager", "admin"), deleteProject);

export default router;
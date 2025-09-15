import express from "express";
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

import { authenticateToken } from "../middleware/tokenAuthentication.js";
import {  authorizeCompanyRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authenticateToken);


router.get("/", getUserProjects);
router.get("/:id", getProjectById);

//Create, Edit, Delete (Manager/Admin only)
router.post("/", authorizeCompanyRoles("Manager", "Admin"), createProject);
router.put("/:projectId", authorizeCompanyRoles("Manager", "Admin"), updateProject);
router.delete("/:projectId", authorizeCompanyRoles("Manager", "Admin"), deleteProject);

export default router;
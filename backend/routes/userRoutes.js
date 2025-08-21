import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { authenticateToken } from "../middleware/tokenAuthentication.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js"; // optional

const router = express.Router();

// ✅ All routes are protected by cookie-based authentication
router.use(authenticateToken);

router.get("/", authorizeRoles("Manager"), getUsers);
router.get("/:id", authorizeRoles("Manager", "Developer", "Tester"), getUserById);


router.put("/:id", authorizeRoles("Manager", "Developer", "Tester"), updateUser);

router.delete("/:id", authorizeRoles("Manager"), deleteUser);

export default router;
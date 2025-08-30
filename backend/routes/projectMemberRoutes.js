import express from "express";
import { 
    getProjectMembers,
    addProjectMember,
    removeProjectMember, 
} from "../controllers/projectMemberController.js";
import { authenticateToken } from "../middleware/tokenAuthentication.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js"; 

const router = express.Router();

router.use(authenticateToken);

// Get all members in a project
router.get("/:projectId", getProjectMembers);
router.post("/:id/members", authorizeRoles("Manager", "Admin"),addProjectMember);
router.delete("/:id/members", authorizeRoles("Manager", "Admin"), removeProjectMember);

export default router;
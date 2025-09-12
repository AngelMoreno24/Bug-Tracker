import express from "express";
import { 
    getProjectMembers,
    addProjectMember,
    removeProjectMember, 
    editProjectMembers,
    getPossibleProjectMembers
} from "../controllers/projectMemberController.js";
import { authenticateToken } from "../middleware/tokenAuthentication.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js"; 

const router = express.Router();

router.use(authenticateToken);

// Get all members in a project
router.get("/:projectId", getProjectMembers);
router.post("/:projectId/members", authorizeRoles("Manager", "Admin"),addProjectMember);
router.delete("/:projectId", authorizeRoles("Manager", "Admin"), removeProjectMember);
router.put("/:projectId/:memberId/edit", authorizeRoles("Manager", "Admin"), editProjectMembers);
router.get("/:projectId/unassigned", getPossibleProjectMembers);

export default router;
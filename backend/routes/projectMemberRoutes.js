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
import ProjectMember from "../models/ProjectMemberModel.js";

const router = express.Router();

router.use(authenticateToken);

// Get all members in a project
router.get("/:projectId", getProjectMembers);
router.post("/:projectId/members", authorizeRoles("Manager", "Admin"),addProjectMember);
router.delete("/:projectId", authorizeRoles("Manager", "Admin"), removeProjectMember);
router.put("/:projectId/:memberId/edit", authorizeRoles("Manager", "Admin"), editProjectMembers);
router.get("/:projectId/unassigned", getPossibleProjectMembers);


// Get membership role for project
router.get("/:projectId/membership", async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  const membership = await ProjectMember.findOne({ projectId, userId });
  if (!membership) return res.status(404).json({ message: "Not a project member" });

  console.log(membership.role)
  res.json({ role: membership.role });
});


export default router;
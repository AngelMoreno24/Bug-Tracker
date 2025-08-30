import express from "express";
import { 
    addCompanyMember,
    listCompanyMembers,
    removeCompanyMember
} from "../controllers/companyMemberController.js";
import { authenticateToken } from "../middleware/tokenAuthentication.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js"; 

const router = express.Router();

router.use(authenticateToken);

// Get all members in a project
router.get("/", authorizeRoles("Admin"), addCompanyMember);
router.post("/", authorizeRoles("Admin"),listCompanyMembers);
router.delete("/", authorizeRoles("Admin"), removeCompanyMember);

export default router;
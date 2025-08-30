import express from "express";
import { 
    addCompanyMember,
    listCompanyMembers,
    removeCompanyMember,
    myCompanies
} from "../controllers/companyMemberController.js";
import { authenticateToken } from "../middleware/tokenAuthentication.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js"; 

const router = express.Router();

router.use(authenticateToken);

// Get all members in a project
router.get("/", authorizeRoles("admin"), addCompanyMember);
router.post("/", authorizeRoles("admin"),listCompanyMembers);
router.delete("/", authorizeRoles("admin"), removeCompanyMember);


router.get("/myCompanies", myCompanies);

export default router;
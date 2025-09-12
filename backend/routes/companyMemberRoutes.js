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
router.post("/", addCompanyMember);
router.get("/", listCompanyMembers);
router.delete("/", removeCompanyMember);


router.get("/myCompanies", myCompanies);

export default router;
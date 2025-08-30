import express from "express";
import {
    updateCompany
} from "../controllers/companyController.js";

import { authenticateToken } from "../middleware/tokenAuthentication.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authenticateToken);


// (Admin only)
router.get("/", authorizeRoles("Admin"), updateCompany);

export default router;
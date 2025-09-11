import express from "express";
import multer from "multer";
import {
  addAttachment,
  getAttachmentsByTicket,
  deleteAttachment,
} from "../controllers/attachmentController.js";
import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.use(authenticateToken);

// multer setup
const upload = multer({ dest: "../uploads/" });

router.post("/", upload.single("file"), addAttachment);
router.get("/:ticketId", getAttachmentsByTicket);
router.delete("/:id", deleteAttachment);

export default router;
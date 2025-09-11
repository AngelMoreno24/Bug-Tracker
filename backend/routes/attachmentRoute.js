import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  addAttachment,
  getAttachmentsByTicket,
  deleteAttachment,
} from "../controllers/attachmentController.js";
import { authenticateToken } from "../middleware/tokenAuthentication.js";

const router = express.Router();
router.use(authenticateToken);

// ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // preserve extension
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, "").replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${name}${ext}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), addAttachment);
router.get("/:ticketId", getAttachmentsByTicket);
router.delete("/:id", deleteAttachment);

export default router;
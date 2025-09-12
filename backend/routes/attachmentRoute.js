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

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // Preserve original extension
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, "").replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${name}${ext}`);
  },
});

// Accept all file types (you can restrict types using fileFilter if needed)
const upload = multer({ storage });

// Routes
router.post("/", upload.single("file"), addAttachment);
router.get("/:ticketId", getAttachmentsByTicket);
router.delete("/:id", deleteAttachment);

export default router;
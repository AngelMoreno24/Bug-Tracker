import Attachment from "../models/Attachment.js";

// -------------------------
// Create new attachment
// -------------------------
export const addAttachment = async (req, res) => {
  try {
    const { ticketId, uploader, notes } = req.body;

    // file info from middleware like multer
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newAttachment = new Attachment({
      ticketId,
      uploader,
      notes,
      file: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
    });

    await newAttachment.save();
    res.status(201).json(newAttachment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------------
// Get all attachments for a ticket
// -------------------------
export const getAttachmentsByTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const attachments = await Attachment.find({ ticketId }).sort({
      createdAt: -1,
    });
    res.json(attachments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------------
// Delete attachment
// -------------------------
export const deleteAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    const attachment = await Attachment.findById(id);

    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    // Optional: remove file from disk too
    // fs.unlinkSync(path.join("uploads", attachment.file));

    await attachment.deleteOne();
    res.json({ message: "Attachment removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
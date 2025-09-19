import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    uploader: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    file: {
      type: String, // stored filename (e.g., "169446234-file.png")
      required: true,
    },
    originalName: {
      type: String, // original uploaded filename
    },
    mimeType: {
      type: String, // for knowing if it's image/pdf/etc
    },
  isDemo: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Attachment", AttachmentSchema);
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const TicketSchema = new Schema({
  title: { type: String, required: true },
  description: String,

  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // who submitted
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" }, // optional assignee

  type: {
    type: String,
    enum: ["bug", "feature", "task", "improvement"],
    default: "bug"
  },

  status: {
    type: String,
    enum: ["open", "in-progress", "resolved", "closed"],
    default: "open"
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "medium"
  },

  severity: {
    type: String,
    enum: ["minor", "major", "blocker"],
    default: "minor"
  },

  tags: [String],
  attachments: [String], // file URLs
  
  isDemo: { type: Boolean, default: false },

}, { timestamps: true });

const Ticket = mongoose.model('Ticket', TicketSchema);
export default Ticket;
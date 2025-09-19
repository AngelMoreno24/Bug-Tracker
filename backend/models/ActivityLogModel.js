import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ActivityLogSchema = new Schema({
  ticketId: { type: Schema.Types.ObjectId, ref: "Ticket" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  action: String, // e.g., "status changed from open → in-progress"
  isDemo: { type: Boolean, default: false },
}, { timestamps: true });


const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);
export default ActivityLog;
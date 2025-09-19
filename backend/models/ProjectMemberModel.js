import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectMemberSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  role: { type: String, enum: ["Admin", "Manager", "Developer", "Tester"], default: "Developer" },
  isDemo: { type: Boolean, default: false },
}, { timestamps: true });

const ProjectMember = mongoose.model('ProjectMember', ProjectMemberSchema);
export default ProjectMember;
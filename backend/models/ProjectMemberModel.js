import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectMemberSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['developer', 'tester', 'manager'], required: true },
  joinedAt: { type: Date, default: Date.now }
});


const ProjectMember = mongoose.model('ProjectMember', ProjectMemberSchema);
export default ProjectMember;
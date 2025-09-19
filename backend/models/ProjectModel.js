import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  isDemo: { type: Boolean, default: false },
}, { timestamps: true });



const Project = mongoose.model('Project', ProjectSchema);
export default Project;
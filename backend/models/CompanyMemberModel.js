import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompanyMemberSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  role: { type: String, enum: ["Admin", "Manager", "Developer", "Tester"], default: "Developer" },
  status: { type: String, enum: ["Active", "Pending", "Removed"], default: "Active" },
}, { timestamps: true });

const CompanyMember = mongoose.model('CompanyMember', CompanyMemberSchema);
export default CompanyMember;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  ownerId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });


const Company = mongoose.model('Company', CompanySchema);
export default Company;
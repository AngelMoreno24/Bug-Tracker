import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });


const Company = mongoose.model('Company', CompanySchema);
export default Company;
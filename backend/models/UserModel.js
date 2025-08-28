import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['admin','manager','developer','demo','submitter'], default: 'admin' }, // global admin only
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);
export default User;
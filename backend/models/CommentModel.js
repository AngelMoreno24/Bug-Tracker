import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true }, 
  isDemo: { type: Boolean, default: false },
}, { timestamps: true });



const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
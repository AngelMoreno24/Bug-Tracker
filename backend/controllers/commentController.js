import Comment from "../models/CommentModel.js";
import ProjectMember from "../models/ProjectMemberModel.js";





// -------------------------
// Create Comment
// -------------------------
export const createComment = async (req, res) => {
  try {
    const { ticketId, content } = req.body;

    // Ensure user is part of project
    const membership = await ProjectMember.findOne({ projectId, userId: req.user._id });
    if (!membership) return res.status(403).json({ message: "Not a project member" });

    const comment = new Comment({
      ticketId,
      author: req.user._id,
      content
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error creating comment", error: err.message });
  }
};





// -------------------------
// Get all comments for a ticket
// -------------------------
export const getComments = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const comments = await Comment.find({ ticketId })

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err.message });
  }
};


// -------------------------
// Get users comments
// -------------------------
export const getUserComments = async (req, res) => {
  try {

    const comment = await Comment.find( { author: req.user._id } )
    
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err.message });
  }
};


// -------------------------
// Delete a comment
// -------------------------
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment", error: err.message });
  }
};
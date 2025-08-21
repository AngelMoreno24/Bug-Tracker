import ProjectMember from "../models/ProjectMemberModel.js";

export const getProjectMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const members = await ProjectMember.find({ projectId })
      .populate("userId", "name email");

    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Error fetching members", error: err.message });
  }
};
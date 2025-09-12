import ProjectMember from "../models/ProjectMemberModel.js";

export const authorizeRoles = (...roles) => async (req, res, next) => {
    try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const membership = await ProjectMember.findOne({ userId, projectId });

    if (!membership || !roles.includes(membership.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient project role" });
    }

    req.projectRole = membership.role; // store for later
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

};
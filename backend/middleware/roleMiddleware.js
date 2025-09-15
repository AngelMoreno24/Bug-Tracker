import ProjectMember from "../models/ProjectMemberModel.js";
import CompanyMember from "../models/CompanyMemberModel.js";

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


export const authorizeCompanyRoles = (...roles) => async (req, res, next) => {
  try {
    let { companyId } = req.body.companyId ? req.body : req.params;

    // If only projectId is given → derive companyId from project
    if (!companyId && req.params.projectId) {
      const project = await Project.findById(req.params.projectId);
      if (project) {
        companyId = project.companyId;
      }
    }

    if (!companyId) {
      return res.status(400).json({ message: "companyId is required for role check" });
    }

    const membership = await CompanyMember.findOne({
      userId: req.user.id,
      companyId,
    });

    if (!membership || !roles.includes(membership.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient company role" });
    }

    req.companyRole = membership.role; // store for later
    next();
  } catch (err) {
    console.error("authorizeCompanyRoles error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
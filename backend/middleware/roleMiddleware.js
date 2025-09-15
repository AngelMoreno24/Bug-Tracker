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
    const { companyId } = req.body.companyId ? req.body : req.params; // check both body + params
    const userId = req.user.id;

    const membership = await CompanyMember.findOne({ userId, companyId });

    if (!membership || !roles.includes(membership.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient company role" });
    }

    req.companyRole = membership.role; // store role for later middleware/controllers
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
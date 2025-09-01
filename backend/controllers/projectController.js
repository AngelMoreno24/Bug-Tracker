import Project from "../models/ProjectModel.js";
import ProjectMember from "../models/ProjectMemberModel.js";
import CompanyMember from "../models/CompanyMemberModel.js";

// -------------------------
// Create a new project (Manager/Admin of company only)
// -------------------------
export const createProject = async (req, res) => {
  try {
    const { name, description, companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ message: "companyId is required" });
    }

    // ✅ Check if user belongs to this company
    const companyMembership = await CompanyMember.findOne({
      companyId,
      userId: req.user._id,
    });

    if (!companyMembership || !["Manager", "Admin"].includes(companyMembership.role)) {
      return res
        .status(403)
        .json({ message: "Only Managers or Admins of this company can create projects" });
    }

    // ✅ Create project tied to company
    const project = await Project.create({ name, description, companyId });

 

    // ✅ Add the creator as a ProjectMember automatically
    await ProjectMember.create({
      projectId: project._id,
      userId: req.user._id,
      role: companyMembership.role,
    });

    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------
// Get all projects the user is a member of
// Optional: filter by companyId
// -------------------------
export const getUserProjects = async (req, res) => {
  try {
    const { companyId } = req.query; // frontend can pass ?companyId=xxx

    // ✅ Find memberships for this user
    let memberships = await ProjectMember.find({ userId: req.user._id }).populate("projectId");

    // ✅ Filter by companyId if provided
    if (companyId) {
      memberships = memberships.filter(
        (m) => m.projectId.companyId.toString() === companyId
      );
    }

    const projects = memberships.map((m) => ({
      project: m.projectId,
      role: m.role,
    }));

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------
// Get single project by ID
// -------------------------
export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

    const membership = await ProjectMember.findOne({
      projectId,
      userId: req.user._id,
    });

    if (!membership) {
      return res.status(403).json({ message: "Not a project member" });
    }

    const project = await Project.findById(projectId);
    res.status(200).json({ project, role: membership.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------
// Update project info (Manager/Admin only)
// -------------------------
export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const membership = await ProjectMember.findOne({
      projectId,
      userId: req.user._id,
    });

    if (!membership || !["Manager", "Admin"].includes(membership.role)) {
      return res
        .status(403)
        .json({ message: "Only Managers or Admins can update the project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Project updated", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
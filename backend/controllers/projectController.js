import Project from "../models/ProjectModel.js";
import ProjectMember from "../models/ProjectMemberModel.js";
import CompanyMember from "../models/CompanyMemberModel.js";

// -------------------------
// Create a new project
// -------------------------
export const createProject = async (req, res) => {
  try {
    const { name, description, companyId } = req.body;

    const project = await Project.create({ name, description, companyId });

    // Add creator as ProjectMember
    await ProjectMember.create({
      projectId: project._id,
      userId: req.user._id,
      role: req.companyRole, // taken from middleware
    });

    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------
// Get all projects the user is a member of
// -------------------------
export const getUserProjects = async (req, res) => {
  try {
    const { companyId } = req.query;

    let memberships = await ProjectMember.find({ userId: req.user._id }).populate("projectId");

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
// Get single project
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
// Update project info
// -------------------------
export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Project updated", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------
// Delete project
// -------------------------
export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    await Project.findByIdAndDelete(projectId);
    await ProjectMember.deleteMany({ projectId });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
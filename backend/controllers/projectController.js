import Project from "../models/ProjectModel.js";
import ProjectMember from "../models/ProjectMemberModel.js";
import User from "../models/UserModel.js";

// -------------------------
// Create a new project (Manager only)
// -------------------------
export const createProject = async (req, res) => {
  try {
    if (req.user.role !== "Manager") {
      return res.status(403).json({ message: "Only Managers can create projects" });
    }

    const { name, description } = req.body;

    const project = await Project.create({ name, description });

    // Add the manager as a member automatically
    await ProjectMember.create({
      projectId: project._id,
      userId: req.user._id,
      role: "Manager",
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
    const memberships = await ProjectMember.find({ userId: req.user._id }).populate("projectId");
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

    if (!membership) return res.status(403).json({ message: "Not a project member" });

    const project = await Project.findById(projectId);
    res.status(200).json({ project, role: membership.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------
// Update project info (Manager only)
// -------------------------
export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const membership = await ProjectMember.findOne({
      projectId,
      userId: req.user._id,
    });

    if (!membership || membership.role !== "Manager") {
      return res.status(403).json({ message: "Only Managers can update the project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "Project updated", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------
// Add a user to the project (Manager only)
// -------------------------
export const addProjectMember = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { userId, role } = req.body;

    // Only Manager can add members
    const membership = await ProjectMember.findOne({ projectId, userId: req.user._id });
    if (!membership || membership.role !== "Manager") {
      return res.status(403).json({ message: "Only Managers can add members" });
    }

    // Prevent duplicates
    const existingMember = await ProjectMember.findOne({ projectId, userId });
    if (existingMember) return res.status(400).json({ message: "User already in project" });

    const newMember = await ProjectMember.create({ projectId, userId, role });
    res.status(201).json({ message: "Member added", member: newMember });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------
// Remove a member from the project (Manager only)
// -------------------------
export const removeProjectMember = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { userId } = req.body;

    const membership = await ProjectMember.findOne({ projectId, userId: req.user._id });
    if (!membership || membership.role !== "Manager") {
      return res.status(403).json({ message: "Only Managers can remove members" });
    }

    await ProjectMember.findOneAndDelete({ projectId, userId });
    res.status(200).json({ message: "Member removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
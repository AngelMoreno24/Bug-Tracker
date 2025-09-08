import ProjectMember from "../models/ProjectMemberModel.js";
import CompanyMember from "../models/CompanyMemberModel.js";
import Company from "../models/CompanyModel.js";


// -------------------------
// Add a user to the project (Manager only)
// -------------------------
export const addProjectMember = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { userId, role } = req.body;

    // Only Manager can add members
    const membership = await ProjectMember.findOne({ projectId, userId: req.user._id });
    if (!membership  ) {
      return res.status(403).json({ message: "Not a member of project" });
    }

    if ( membership.role == "Manager" || membership.role == "Admin"  ) {
      // Prevent duplicates
      const existingMember = await ProjectMember.findOne({ projectId, userId });
      if (existingMember) return res.status(400).json({ message: "User already in project" });

      const newMember = await ProjectMember.create({ projectId, userId, role });
      res.status(201).json({ message: "Member added", member: newMember });
    }else{
      
      return res.status(403).json({ message: "Only Managers and Admins can add members" });
    }

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

// -------------------------
// Get the members from a project
// -------------------------
export const getProjectMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const members = await ProjectMember.find({ projectId })
      .populate("userId", "name"); // only fetch `name` field from User

    // Map into a clean array
    const formattedMembers = members.map((member) => ({
      id: member.userId._id,
      name: member.userId.name,
      role: member.role,
    }));

    res.json({ members: formattedMembers });
  } catch (err) {
    res.status(500).json({ message: "Error fetching members", error: err.message });
  }
};



// -------------------------
// Get the members from a project
// -------------------------
export const getPossibleProjectMembers = async (req, res) => {
  try {

    //Retrieve all project members assigned to project
    const { projectId } = req.params;

    
    const assignedMembers = await ProjectMember.find({ projectId })
      .populate("userId", "name"); // only fetch `name` field from User

    // Map into a clean array
    const formattedMembers = assignedMembers.map((member) => ({
      id: member.userId._id,
      name: member.userId.name
    }));


    //retrieve all company members not assigned to current project

    const company = await Company.findOne({ ownerId: req.user._id });
    if (!company) return res.status(403).json({ message: "No company found for admin" });


    const companyMembers = await CompanyMember.find({ companyId: company._id }).populate("userId", "id name email role");

    const simplifiedMembers = companyMembers.map(m => ({
      id: m.userId.id,
      name: m.userId.name
    }));

    // filter out the assigned members
    //const unassignedMembers = companyMembers.filter(value => !value.includes(assignedMembers.userId._id));
    const unassignedMembers = simplifiedMembers.filter(({ name }) => !formattedMembers.some((e) => e.name === name))



    res.json({ unassignedMembers });



  } catch (err) {
    res.status(500).json({ message: "Error fetching members", error: err.message });
  }
};



// -------------------------
// Edit a members from a project
// -------------------------
export const editProjectMembers = async (req, res) => {
  try {
    const { memberId } = req.params;
    const updates = req.body;

    
    const member = await ProjectMember.findByIdAndUpdate(memberId, updates, { new: true })

    if (!member) return res.status(404).json({ message: "Member not found" });

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Error updating members", error: err.message });
  }
};
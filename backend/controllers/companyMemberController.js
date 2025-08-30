// controllers/companyMemberController.js
import CompanyMember from "../models/CompanyMemberModel.js";
import Company from "../models/CompanyModel.js";
import User from "../models/UserModel.js";

// -------------------------
// Add a new company member (Admin only)
// -------------------------
export const addCompanyMember = async (req, res) => {
  try {
    const { email, role } = req.body;

    // 1 Find the company owned by the logged-in admin
    const company = await Company.findOne({ ownerId: req.user._id });
    if (!company) return res.status(403).json({ message: "No company found for admin" });

    // 2 Find the user to add by email
    const userToAdd = await User.findOne({ email });
    if (!userToAdd) return res.status(404).json({ message: "User not found" });

    // 3 Check if user is already a member
    const existingMember = await CompanyMember.findOne({
      userId: userToAdd._id,
      companyId: company._id,
    });
    if (existingMember) return res.status(400).json({ message: "User is already a member" });

    // 4 Create company member
    const member = await CompanyMember.create({
      userId: userToAdd._id,
      companyId: company._id,
      role,
    });

    res.status(201).json({ message: "Member added", member });
  } catch (error) {
    console.error("Add company member error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// List members of admin's company
// -------------------------
export const listCompanyMembers = async (req, res) => {
  try {
    const company = await Company.findOne({ ownerId: req.user._id });
    if (!company) return res.status(403).json({ message: "No company found for admin" });

    const members = await CompanyMember.find({ companyId: company._id }).populate("userId", "name email role");
    res.json({ members });
  } catch (error) {
    console.error("List company members error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// Remove member
// -------------------------
export const removeCompanyMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    const company = await Company.findOne({ ownerId: req.user._id });
    if (!company) return res.status(403).json({ message: "No company found for admin" });

    const deleted = await CompanyMember.findOneAndDelete({
      _id: memberId,
      companyId: company._id,
    });

    if (!deleted) return res.status(404).json({ message: "Member not found or not part of your company" });

    res.json({ message: "Member removed" });
  } catch (error) {
    console.error("Remove company member error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
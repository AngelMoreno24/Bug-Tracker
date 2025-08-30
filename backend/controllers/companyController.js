import Company from "../models/CompanyModel.js";

// -------------------------
// Update company info (Manager only)
// -------------------------
export const updateCompany = async (req, res) => {
  try { 

    const membership = await Company.findOne({
      ownerId: req.user._id,
    });

    if (!membership || membership.role !== "Admin") {
      return res.status(403).json({ message: "Only Admin can update the company" });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      ownerId,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "Company updated", company: updatedCompany });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


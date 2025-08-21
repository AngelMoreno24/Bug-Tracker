import ActivityLog from "../models/ActivityLogModel.js";

export const getProjectActivity = async (req, res) => {
  try {
    const { projectId } = req.params;

    const logs = await ActivityLog.find({ projectId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching activity logs", error: err.message });
  }
};
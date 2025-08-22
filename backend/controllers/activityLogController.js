import ActivityLog from "../models/ActivityLogModel.js";

// Get all activity logs for a project
export const getProjectLogs = async (req, res) => {
  try {
    const { projectId } = req.params;

    const logs = await ActivityLog.find({ projectId })
      .populate("userId", "username email") // show who did it
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching activity logs", error: err.message });
  }
};

// Get activity logs for a ticket
export const getTicketLogs = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const logs = await ActivityLog.find({ ticketId })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching ticket logs", error: err.message });
  }
};

// Get activity logs by user
export const getUserLogs = async (req, res) => {
  try {
    const { userId } = req.params;

    const logs = await ActivityLog.find({ userId })
      .populate("projectId", "name")
      .populate("ticketId", "title")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user logs", error: err.message });
  }
};
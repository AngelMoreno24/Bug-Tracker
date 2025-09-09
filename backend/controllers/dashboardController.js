// controllers/dashboardController.js
import Project from "../models/ProjectModel.js";
import Ticket from "../models/TicketModel.js";
import ProjectMember from "../models/ProjectMemberModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    
    const userId = req.user._id;


    const projects = await ProjectMember.find( {userId})
    .populate("projectId","_id")

    
    // Project stats
    const totalProjects = projects.length

    const projectIds = projects.map((p) => p.projectId._id);


    // Ticket stats
    const totalTickets = await Ticket.countDocuments({ projectId: { $in: projectIds } });
    const openTickets = await Ticket.countDocuments({ projectId: { $in: projectIds }, status: "open" });
    const inProgressTickets = await Ticket.countDocuments({ projectId: { $in: projectIds }, status: "in-progress" });
    const closedTickets = await Ticket.countDocuments({ projectId: { $in: projectIds }, status: "closed" });


    const criticalTickets = await Ticket.countDocuments({ projectId: { $in: projectIds }, priority: "critical" });
    const highTickets = await Ticket.countDocuments({ projectId: { $in: projectIds }, priority: "high" });
    const mediumTickets = await Ticket.countDocuments({ projectId: { $in: projectIds }, priority: "medium" });
    const lowTickets = await Ticket.countDocuments({ projectId: { $in: projectIds }, priority: "low" });

 

    // Example of another metric
    const unassignedTickets = await Ticket.countDocuments({ assignedTo: null });

    // Combine into one response
    res.json({
        projects: totalProjects,
        tickets: totalTickets,
        openTickets,
        inProgressTickets,
        closedTickets,
        unassignedTickets,
        criticalTickets,
        highTickets,
        mediumTickets,
        lowTickets
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err.message);
    res.status(500).json({ error: "Server error fetching dashboard stats" });
  }
};
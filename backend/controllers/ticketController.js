import Ticket from "../models/TicketModel.js";
import ProjectMember from "../models/ProjectMemberModel.js";

export const createTicket = async (req, res) => {
  try {
    const { projectId, title, description, priority, assignedTo } = req.body;

    // Ensure user is part of project
    const membership = await ProjectMember.findOne({ projectId, userId: req.user._id });
    if (!membership) return res.status(403).json({ message: "Not a project member" });

    const ticket = new Ticket({
      projectId,
      title,
      description,
      priority,
      createdBy: req.user._id,
      assignedTo,
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Error creating ticket", error: err.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tickets = await Ticket.find({ projectId })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tickets", error: err.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const updates = req.body;

    const ticket = await Ticket.findByIdAndUpdate(ticketId, updates, { new: true })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Error updating ticket", error: err.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findByIdAndDelete(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting ticket", error: err.message });
  }
};
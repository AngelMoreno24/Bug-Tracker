import Ticket from "../models/TicketModel.js";
import ProjectMember from "../models/ProjectMemberModel.js";

// -------------------------
// Create ticket
// -------------------------
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
      assignedTo: assignedTo || null, // ✅ Unassigned if no ID provided
    });

    await ticket.save();

    // Populate assignedTo name safely
    await ticket.populate("assignedTo", "name");

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Error creating ticket", error: err.message });
  }
};

// -------------------------
// Get all tickets for a project
// -------------------------
export const getTickets = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tickets = await Ticket.find({ projectId })
      .populate("assignedTo", "name")
      .populate("createdBy", "name");

    // Map assignedTo to "Unassigned" if null
    const mappedTickets = tickets.map(t => ({
      ...t._doc,
      assignedName: t.assignedTo ? t.assignedTo.name : "Unassigned",
    }));

    res.json(mappedTickets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tickets", error: err.message });
  }
};

// -------------------------
// Get details for a ticket
// -------------------------
export const getTicketDetails = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId)
      .populate("createdBy", "name")
      .populate("projectId", "name")
      .populate("assignedTo", "name");

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const result = {
      ...ticket._doc,
      assignedName: ticket.assignedTo ? ticket.assignedTo.name : "Unassigned",
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching ticket details", error: err.message });
  }
};

// -------------------------
// Get tickets assigned to the logged-in user
// -------------------------
export const getAssignedTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({ assignedTo: req.user._id })
      .populate("createdBy", "name")
      .populate("projectId", "name")
      .populate("assignedTo", "name");

    const mappedTickets = tickets.map(t => ({
      ...t._doc,
      assignedName: t.assignedTo ? t.assignedTo.name : "Unassigned",
    }));

    res.json(mappedTickets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching assigned tickets", error: err.message });
  }
};

// -------------------------
// Update a ticket
// -------------------------
export const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const updates = req.body;

    const ticket = await Ticket.findByIdAndUpdate(ticketId, updates, { new: true })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const result = {
      ...ticket._doc,
      assignedName: ticket.assignedTo ? ticket.assignedTo.name : "Unassigned",
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error updating ticket", error: err.message });
  }
};

// -------------------------
// Delete a ticket
// -------------------------
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
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// -------------------------
// Create Ticket
// -------------------------
export const createTicket = async (ticketData, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/tickets`,
      ticketData, // { projectId, title, description, priority, assignedTo }
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Create ticket failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Get all tickets for a project
// -------------------------
export const getTickets = async (projectId, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/tickets/${projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch tickets failed:", err.response?.data || err.message);
    return false;
  }
};


// -------------------------
// Get One tickets By Id
// -------------------------
export const getTicketDetails = async (ticketId, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/tickets/${ticketId}/details`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch tickets failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Update a ticket
// -------------------------
export const updateTicket = async (ticketId, updates, token) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/api/tickets/${ticketId}`,
      updates, // e.g. { title: "Updated", priority: "High" }
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Update ticket failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Delete a ticket
// -------------------------
export const deleteTicket = async (ticketId, token) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/api/tickets/${ticketId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Delete ticket failed:", err.response?.data || err.message);
    return false;
  }
};
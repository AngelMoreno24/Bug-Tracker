import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// -------------------------
// Get all activity logs for a project
// -------------------------
export const getProjectLogs = async (projectId, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/activityLogs/project/${projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch project logs failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Get activity logs for a ticket
// -------------------------
export const getTicketLogs = async (ticketId, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/activityLogs/ticket/${ticketId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch ticket logs failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Get activity logs by user
// -------------------------
export const getUserLogs = async (userId, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/activityLogs/user/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch user logs failed:", err.response?.data || err.message);
    return false;
  }
};
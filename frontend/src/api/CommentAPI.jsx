import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;




// -------------------------
// Create Comment
// -------------------------
export const createComment = async (commentData, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/comments`,
      commentData, // { projectId, title, description, priority, assignedTo }
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Create comments failed:", err.response?.data || err.message);
    return false;
  }
};




// -------------------------
// Get all Comment for a Ticket
// -------------------------
export const getComments = async (ticketId, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/comments/${ticketId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch comments failed:", err.response?.data || err.message);
    return false;
  }
};




// -------------------------
// Get Assigned comments
// -------------------------
export const getAssignedComments = async ( token ) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/comments/myComments`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch comments failed:", err.response?.data || err.message);
    return false;
  }
};




// -------------------------
// Delete a comments
// -------------------------
export const deleteComment = async (commentId, token) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/api/comments/${commentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Delete comment failed:", err.response?.data || err.message);
    return false;
  }
};
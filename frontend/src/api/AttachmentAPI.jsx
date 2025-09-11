import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// -------------------------
// Get all attachments for a ticket
// -------------------------
export const getTicketAttachments = async (ticketId, token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/attachments/${ticketId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch ticket attachments failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Upload a new attachment
// -------------------------
export const addAttachment = async (formData, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/attachments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Upload attachment failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Delete an attachment
// -------------------------
export const deleteAttachment = async (attachmentId, token) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/api/attachments/${attachmentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Delete attachment failed:", err.response?.data || err.message);
    return false;
  }
};
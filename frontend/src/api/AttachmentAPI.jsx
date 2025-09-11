import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAttachments = async (ticketId, token) => {
  const res = await axios.get(`${API_URL}/${ticketId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addAttachment = async (formData, token) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteAttachment = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
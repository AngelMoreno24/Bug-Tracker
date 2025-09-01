import axios from "axios";

axios.defaults.withCredentials = true;


export const getProjectMembers = async (projectId, token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/projectMembers/`,
        { projectId },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ attach token
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    return false;
  }
};
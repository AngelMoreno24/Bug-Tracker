import axios from "axios";
  axios.defaults.withCredentials = true;

export const createProject = async (name, description, companyId, token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/`,
        { name , description, companyId },
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
}

export const getProject = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/`,
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
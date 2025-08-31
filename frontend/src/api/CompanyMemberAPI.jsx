import axios from "axios";
  axios.defaults.withCredentials = true;


export const getMyCompanies = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/companyMembers/myCompanies/`,
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
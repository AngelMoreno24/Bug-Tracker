import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;





// -------------------------
// Get Dashboard Data
// -------------------------
export const getDashboardStats = async ( token ) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/dashboard/`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch dashboard data failed:", err.response?.data || err.message);
    return false;
  }
};



import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// -------------------------
// Add a new company member (Admin only)
// -------------------------
export const addCompanyMember = async (email, role, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/companyMembers`,
      { email, role }, // body
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Add company member failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// List members of admin's company
// -------------------------
export const listCompanyMembers = async (token) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/companyMembers`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data; // { members: [...] }
  } catch (err) {
    console.error("Fetch company members failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Remove a company member
// -------------------------
export const removeCompanyMember = async (memberId, token) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/api/companyMembers/${memberId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Remove company member failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// List companies the user is a member of
// -------------------------

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
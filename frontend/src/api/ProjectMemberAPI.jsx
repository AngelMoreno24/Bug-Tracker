import axios from "axios";

axios.defaults.withCredentials = true;


// -------------------------
// Get the members from a project
// -------------------------
export const getProjectMembers = async (projectId, token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/projectMembers/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ attach token
        },
        withCredentials: true,
      }
    );

    return res.data.members;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    return false;
  }
};


// -------------------------
// Get the members from a project
// -------------------------
export const getPossibleProjectMembers = async (projectId, token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/projectMembers/${projectId}/unassigned`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ attach token
        },
        withCredentials: true,
      }
    );

    return res.data.unassignedMembers;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    return false;
  }
};


// -------------------------
// Add a user to the project (Manager only)
// -------------------------
export const addProjectMember = async (projectId, userId, role, token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/projectMembers/${projectId}/members`,
      { userId, role }, // body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Add member failed:", err.response?.data || err.message);
    return false;
  }
};


// -------------------------
// Remove a member from the project (Manager only)
// -------------------------

export const removeProjectMember = async (projectId, userId, token) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/projectMembers/${projectId}`,
      {
        data: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Remove member failed:", err.response?.data || err.message);
    return false;
  }
};


// -------------------------
// Edit a member from the project 
// -------------------------

export const editProjectMember = async (projectId, memberId, role, token) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/projectMembers/${projectId}/${memberId}/edit`,
      { role }, // body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Add member failed:", err.response?.data || err.message);
    return false;
  }
};

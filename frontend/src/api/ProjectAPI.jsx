import axios from "axios";
axios.defaults.withCredentials = true;

// -------------------------
// Create a new project (Manager/Admin of company only)
// -------------------------
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

// -------------------------
// Get all projects the user is a member of
// -------------------------
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

// -------------------------
// Get single project by ID
// -------------------------


export const getProjectById = async (projectId, token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectId}`,
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


// -------------------------
// Update project info (Manager/Admin only)
// -------------------------
export const updateProject = async (projectId, updatedData, token) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectId}`,
      updatedData, // body (e.g. { name: "New Title", description: "Updated" })
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Update project failed:", err.response?.data || err.message);
    return false;
  }
};
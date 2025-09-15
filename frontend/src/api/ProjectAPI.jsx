import axios from "axios";
axios.defaults.withCredentials = true;

// -------------------------
// Create a new project (Company Manager/Admin only)
// -------------------------
export const createProject = async (name, description, companyId, token) => {
  if (!companyId) {
    console.error("Missing companyId. Cannot create project.");
    return false;
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/`,
      { name, description, companyId }, // must include companyId for backend check
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Create project failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Get all projects the user is a member of
// -------------------------
export const getProject = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch projects failed:", err.response?.data || err.message);
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
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Fetch project failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Update project info (Company Manager/Admin only)
// -------------------------
export const updateProject = async (projectId, updatedData, token) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectId}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Update project failed:", err.response?.data || err.message);
    return false;
  }
};

// -------------------------
// Delete project (Company Manager/Admin only)
// -------------------------
export const deleteProject = async (projectId, token) => {
  if (!projectId) {
    console.error("Missing projectId. Cannot delete project.");
    return false;
  }

  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Delete project failed:", err.response?.data || err.message);
    return false;
  }
};
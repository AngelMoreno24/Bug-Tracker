import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from "../components/Modal"; 
import AddProjectForm from "../components/forms/AddProjectForm";
import { getProject, createProject, deleteProject } from '../api/ProjectAPI';
import { useAuth } from "../hooks/useAuth"; 

const Projects = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();  

  const [projects, setProjects] = useState([]);
  const [addProjectOpen, setAddProjectOpen] = useState(false);

  // ✅ auto-fill companyId from logged-in user if available
  const [projectForm, setProjectForm] = useState({ 
    title: "", 
    description: "", 
    companyId: user?.companyId || "" 
  });

  const handleAddProject = async () => {
    if (!projectForm.companyId) {
      alert("Missing companyId. Please select your company.");
      return;
    }

    await createProject(
      projectForm.title, 
      projectForm.description, 
      projectForm.companyId, 
      token
    );

    await fetchProjects();
    setProjectForm({ title: "", description: "", companyId: user?.companyId || "" });
    setAddProjectOpen(false);
  };

  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    const success = await deleteProject(projectId, token);
    if (success) {
      await fetchProjects();
    }
  };

  const fetchProjects = async () => {
    try {
      const projects = await getProject(token);
      if (projects && Array.isArray(projects)) {
        const mappedProjects = projects.map((item) => ({
          id: item.project._id,
          title: item.project.name,
          description: item.project.description,
          role: item.role, // important for enabling/disabling buttons
        })); 
        setProjects(mappedProjects);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  // Demo data for portfolio
  useEffect(() => {
    const projectsArray = [
      { id: 1, title: "Website", description: "Company website with marketing pages" },
      { id: 2, title: "Dashboard", description: "Internal analytics dashboard" },
      { id: 3, title: "Backend API", description: "API powering mobile and web apps" },
      { id: 4, title: "Mobile App", description: "Cross-platform mobile application" },
      { id: 5, title: "Authentication", description: "User login and authentication system" },
      { id: 6, title: "E-commerce", description: "Online store platform with payments" },
    ];
    setProjects(projectsArray);
  }, []);

  const row = (title, description, id, role, index) => {
    const canEdit = role === "Manager" || role === "Admin"; // only allow delete/manage if user has permission

    return (
      <div 
        className={`grid grid-cols-5 px-4 py-3 text-gray-700 ${
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        } hover:bg-blue-50 transition`}
      >
        <p className='self-center text-center font-medium'>{title}</p>
        <p className='self-center text-center text-sm text-gray-600'>{description}</p>
        
        <button 
          onClick={() => navigate(`/accounts/projects/${id}`)} 
          className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 m-auto shadow-sm'
        >
          Details
        </button>
        
        <button 
          onClick={() => navigate(`/accounts/projects/${id}/members`)} 
          className={`rounded-md px-3 py-1 m-auto shadow-sm text-white ${canEdit ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-400 cursor-not-allowed"}`}
          disabled={!canEdit}
        >
          Manage Users
        </button>

        <button 
          onClick={() => handleDeleteProject(id)} 
          className={`rounded-md px-3 py-1 m-auto shadow-sm text-white ${canEdit ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"}`}
          disabled={!canEdit}
        >
          Delete
        </button>
      </div>
    )
  };



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>  
        <button 
          className='px-4 py-2 bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-lg shadow-md transition'
          onClick={() => setAddProjectOpen(true)}
        >
          Create Project
        </button>
      </div>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='grid grid-cols-5 px-4 py-3 bg-gray-200 font-semibold text-gray-700'>
          <p className='text-center'>Project Name</p>
          <p className='text-center'>Project Description</p>
          <p className='text-center col-span-3'>Actions</p>
        </div>
        
        {projects.map((project, index) => (
          <React.Fragment key={project.id}>
            {row(project.title, project.description, project.id, project.role, index)}
          </React.Fragment>
        ))}
      </div>

      {/* Modals */}
      {addProjectOpen && (
        <Modal 
          title="Create Project" 
          onClose={() => setAddProjectOpen(false)} 
          onSave={handleAddProject}
        >
          <AddProjectForm 
            projectForm={projectForm} 
            setProjectForm={setProjectForm} 
          />
        </Modal>
      )}
    </div>
  )
}

export default Projects;
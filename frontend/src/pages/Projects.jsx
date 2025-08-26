import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const projectsArray = [
      { id: 1, title: "Website", description: "Company website with marketing pages" },
      { id: 2, title: "Dashboard", description: "Internal analytics dashboard" },
      { id: 3, title: "Backend API", description: "API powering mobile and web apps" },
      { id: 4, title: "Mobile App", description: "Cross-platform mobile application" },
      { id: 5, title: "Authentication", description: "User login and authentication system" },
      { id: 6, title: "E-commerce", description: "Online store platform with payments" },
    ];
    setProjects(projectsArray)
  },[])

  const row = (title, description, id, index) => {
    return (
      <div 
        className='grid grid-cols-4 px-4 py-2 bg-white hover:bg-gray-100'
      >
        <p className='self-center text-center'>{title}</p>
        <p className='self-center text-center'>{description}</p>
        <button 
          onClick={() => navigate(`/accounts/projects/${id}`)} 
          className='bg-blue-500 hover:bg-blue-700 text-white rounded m-auto self-center text-center h-8 w-20'
        >
          Details
        </button>
        <button 
          onClick={() => navigate(`/accounts/projects/members/${id}`)} 
          className='bg-blue-500 hover:bg-blue-700 text-white rounded self-center text-center h-8 w-35'>
          Manage Users
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1>Projects</h1>  

      <button className='px-4 py-2 bg-amber-300 hover:bg-amber-700 rounded transition mb-4 mt-4'>
        create Project
      </button>

      <div className='px-4 h-96 py-2 bg-white rounded grid-rows-2 shadow-gray-900 h-auto min-w-130'>
        <div className='grid grid-rows-4'>
          <div className='grid grid-cols-4 px-4 py-2 h-auto border-b-1'>
            <p className='m-auto h-auto'>Project Name</p>
            <p className='m-auto h-auto'>Project Description</p>
          </div>
          
          {projects.map((project, index) => (
            <React.Fragment key={project.id}>
              {row(project.title, project.description, project.id, index)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
import React from 'react'

const Projects = () => {

  const row = (title, description, thing, other)=>{
    return(

      <div className='grid grid-cols-4  px-4 py-2 bg-white hover:bg-gray-100'>
        <p className='self-center text-center'>{title}</p>
        <p className='self-center text-center'>{description}</p>
        <button className='bg-blue-500 hover:bg-blue-700 text-white rounded m-auto self-center text-center h-8 w-20'>Details</button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white rounded self-center text-center h-8 w-35'>Manage Users</button>
      </div>
    )

  }
  return (
    <div>
      <h1>Projects</h1>  

      <button className='px-4 py-2 bg-amber-300 hover:bg-amber-700 rounded transition mb-4 mt-4'>
        create Project
      </button>


      <div className='px-4 h-96 py-2 bg-white  rounded grid-rows-2 shadow-gray-900 h-auto min-w-130'>
        <div className='grid grid-rows-4 '>
          <div className='grid grid-cols-4  px-4 py-2 h-auto border-b-1'>
            <p className='m-auto h-auto'>Project Name</p>
            <p className='m-auto h-auto'>Project Description</p>
          </div>
          {row('name', 'description', 'thing', 'other')}
          {row('name', 'description', 'thing', 'other')}
          {row('name', 'description', 'thing', 'other')}
          {row('name', 'description', 'thing', 'other')}
        </div>
      </div>
    </div>
  )
}

export default Projects

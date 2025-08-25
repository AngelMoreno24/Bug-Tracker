import React, {useState, useEffect} from 'react'

const Tickets = () => {

  const [tickets, setTickets] = useState([{}]);

  useEffect(() => {

  const array = [
    { title: "Login button not working", type: "Bug", project: "Website", priority: "high", submitter: "Jane" },
    { title: "Add dark mode", type: "Feature", project: "Dashboard", priority: "medium", submitter: "John" },
    { title: "Fix API timeout", type: "Bug", project: "Backend API", priority: "high", submitter: "Alice" },
    { title: "Create onboarding flow", type: "Task", project: "Mobile App", priority: "low", submitter: "Bob" },
    { title: "Improve password strength rules", type: "Feature", project: "Authentication", priority: "medium", submitter: "Sarah" },
    { title: "Update footer links", type: "Task", project: "Website", priority: "low", submitter: "Tom" },
    ];
    setTickets(array)
  },[])

  const getTypeColor = (type) => {
  switch (type) {
    case "Bug":
      return "bg-red-600 font-bold";
    case "Feature":
      return "bg-green-600 font-bold";
    case "Task":
      return "bg-blue-600 font-bold";
    default:
      return "bg-gray-600 font-bold";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-600 font-bold";
      case "medium":
        return "bg-yellow-500 font-bold ";
      case "low":
        return "bg-green-600 font-bold";
      default:
        return "bg-gray-600 font-bold";
    }
  };


  const row = (title, type, project, priority, submitter, key) => {

    

    return (
      <div onClick={() =>{handleClick(title)}} key={key} className='grid grid-cols-5 px-4 py-2 bg-white hover:bg-gray-100 border-t-1'>
        <p  className='self-center text-center'>{title}</p>
        <p className={`self-center text-center rounded w-20 m-auto text-white ${getTypeColor(type)}`}>{type}</p>
        <p className='self-center text-center'>{project}</p>
        <p className={`self-center text-center rounded w-20 m-auto text-white ${getPriorityColor(priority)}`}>{priority}</p>
        <p className='self-center text-center'>{submitter}</p>
      </div>
    );
  };

  const handleClick = (title) => {
    alert(`You clicked on: ${title}`);
  };


  return (
    <div>


      <div className='px-4 h-96 py-2 bg-white  rounded grid-rows-2 shadow-gray-900 h-auto min-w-130'>
        <h1 className='self-center text-center font-bold text-3xl pt-5 pb-5 border-b-3'>Tickets</h1>  
        <div className='grid grid-rows-4 '>
          <div className='grid grid-cols-5  px-4 py-2 h-auto border-b-1'>
            <p className='m-auto h-auto font-bold'>Title</p>
            <p className='m-auto h-auto font-bold'>Type</p>
            <p className='m-auto h-auto font-bold'>Project</p>
            <p className='m-auto h-auto font-bold'>Priority</p>
            <p className='m-auto h-auto font-bold'>Submitter</p>
          </div>
          {tickets.map((ticket, index) =>
            row(ticket.title, ticket.type, ticket.project, ticket.priority, ticket.submitter, index)
          )}
        </div>
      </div>
    </div>
  )
}

export default Tickets

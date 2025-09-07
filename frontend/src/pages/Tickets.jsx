import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from "../hooks/useAuth";

import { getAssignedTickets } from '../api/TicketAPI';

const Tickets = () => {

  const navigate = useNavigate();

  const { token } = useAuth();  

  const [tickets, setTickets] = useState([]);


  const fetchTickets = async () => {
    try {
      const ticketList = await getAssignedTickets(token); // 🔑 use token from context
      console.log(ticketList);
 
      setTickets(ticketList); // ✅ update state with mapped output

 

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTickets();
    }
  }, [token]);





  const getTypeColor = (type) => {
  switch (type) {
    case "bug":
      return "bg-red-600 font-bold";
    case "feature":
      return "bg-green-600 font-bold";
    case "task":
      return "bg-blue-600 font-bold";
    default:
      return "bg-gray-600 font-bold";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-black font-bold";
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


  const row = (title, type, project, priority, submitter, key, id) => {

    

    return (
      <div onClick={() => navigate(`/accounts/projects/ticket/${id}`)} key={key} className='grid grid-cols-5 px-4 py-2 bg-white hover:bg-gray-100 border-t-1'>
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
          {tickets?tickets.map((ticket, index) =>
            row(ticket.title, ticket.type, ticket.projectId.name, ticket.priority, ticket.createdBy.name, index, ticket._id)
          ):(<p></p>)}
        </div>
      </div>
    </div>
  )
}

export default Tickets

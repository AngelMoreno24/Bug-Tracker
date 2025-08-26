import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const navigate = useNavigate();

    const { id } = useParams();  // <-- grabs "id" from the URL

    const [users, setUsers] = useState([{}]);
    const [inviteId, setInviteId] = useState('');

  const [tickets, setTickets] = useState([{}]);


    useEffect(() => {

        const array = [
        { name: "Alice Johnson", role: "Admin" },
        { name: "Bob Smith", role: "Developer" },
        { name: "Charlie Brown", role: "Manager" },
        { name: "Diana Prince", role: "Submitter" },
        { name: "Ethan Clark", role: "Developer" },
        { name: "Fiona Lee", role: "Submitter" },    
        ];
        setUsers(array)

        
        const ticketsArray = [
        { title: "Login button not working", type: "Bug", project: "Website", priority: "high", submitter: "Jane" },
        { title: "Add dark mode", type: "Feature", project: "Dashboard", priority: "medium", submitter: "John" },
        { title: "Fix API timeout", type: "Bug", project: "Backend API", priority: "high", submitter: "Alice" },
        { title: "Create onboarding flow", type: "Task", project: "Mobile App", priority: "low", submitter: "Bob" },
        { title: "Improve password strength rules", type: "Feature", project: "Authentication", priority: "medium", submitter: "Sarah" },
        { title: "Update footer links", type: "Task", project: "Website", priority: "low", submitter: "Tom" },
        ];
        setTickets(ticketsArray)

    },[])


    const getColor = (role) => {
    switch (role) {
        case "Admin":
        return "bg-red-500 text-white font-semibold hover:bg-red-600";       // strong red
        case "Manager":
        return "bg-orange-400 text-white font-semibold hover:bg-orange-500"; // softer, warm orange
        case "Developer":
        return "bg-blue-500 text-white font-semibold hover:bg-blue-600";      // nice blue
        case "Submitter":
        return "bg-purple-500 text-white font-semibold hover:bg-purple-700"; // vibrant purple
        default:
        return "bg-gray-400 text-white font-semibold hover:bg-gray-600";      // neutral gray
    }
    };

    const row = (name, userRole, roleCategory, key) => {
        
        if(userRole == roleCategory)
        return (
        <div
            onClick={() => handleClick(name)}
            key={key}
            className={`px-4 py-2 ${getColor(userRole)} rounded cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md`}
        >
            <p className="flex flex-wrap">{name}</p>
        </div>
        );
    };

    const handleClick = (title) => {
        alert(`You clicked on: ${title}`);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`You typed: ${inviteId}`);
    };



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


  const ticketRow = (title, type, project, priority, submitter, key) => {

    

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
    return (
        <div>


            <div className='px-4 h-96 py-2 bg-white  rounded grid-rows-2  shadow-gray-900 h-auto min-w-[130]'>
                <h1 className='self-center text-center font-bold text-3xl pt-5 pb-5 border-b-3'>Project Details</h1>  
                <p>Project ID: {id}</p>
                <p className="px-4 py-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

            </div>
            
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 '>

                {
                    //------------------------------------------------------------
                    //----------------------- Members ----------------------------
                    //------------------------------------------------------------
                }
                <div className='mt-5 px-4 h-96 py-2 bg-white  rounded grid-rows-2  shadow-gray-900 h-auto '>
                    
                    <div className="flex items-center justify-between border-b-3 pt-5 pb-5">
                        <h1 className="font-bold text-3xl text-center flex-1">Members</h1>

                        <button 
                            onClick={() => navigate(`/accounts/projects/${id}/members`)} 
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded h-8 w-20 "
                        >
                            Edit
                        </button>
                    </div>
                    <div className='grid grid-rows-4 '>
                        
                        <div>
                            <p className='m-auto h-auto font-bold'>Admin</p>
                            <div className="flex flex-wrap gap-2">
                                {users.map((user, index) =>
                                row(user.name, user.role, "Admin", index)
                                )}
                            </div>
                        </div>

                        <div>
                            <p className='m-auto h-auto font-bold'>Project Manager</p>
                            <div className="flex flex-wrap gap-2">
                                {users.map((user, index) =>
                                row(user.name, user.role, "Manager", index)
                                )}
                            </div>
                        </div>

                        <div>
                            <p className='m-auto h-auto font-bold'>Developer</p> 
                            <div className="flex flex-wrap gap-2">
                                {users.map((user, index) =>
                                row(user.name, user.role, "Developer", index)
                                )}
                            </div>   
                        </div>

                        <div>
                        <p className='m-auto h-auto font-bold'>Submitter</p>
                        <div className="flex flex-wrap gap-2">
                            {users.map((user, index) =>
                            row(user.name, user.role, "Submitter", index)
                            )}
                        </div>
                        </div>

                    </div>
                    
                </div>

                {
                    //------------------------------------------------------------
                    //----------------------- Tickets ----------------------------
                    //------------------------------------------------------------
                }
                <div className='mt-5 px-4 h-96 py-2 bg-white  rounded grid-rows-2  shadow-gray-900 h-auto '>
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
                        ticketRow(ticket.title, ticket.type, ticket.project, ticket.priority, ticket.submitter, index)
                    )}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails

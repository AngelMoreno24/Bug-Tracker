import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const ProjectTicketDetails = () => {
  const navigate = useNavigate();

    const { id } = useParams();  // <-- grabs "id" from the URL

    const [users, setUsers] = useState([{}]);
    const [inviteId, setInviteId] = useState('');
    const [comments, setComments] = useState([{}]);

    const [tickets, setTickets] = useState([{}]);
    const [history, setHistory] = useState([{}]);
    const [attachements, setAttachments] = useState([{}]);


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

        const ticketComments = [
        {
            commenter: "Alice Johnson",
            message: "Initial bug report: login page not loading correctly.",
            createDate: "2025-08-20T10:15:00Z"
        },
        {
            commenter: "Bob Smith",
            message: "Confirmed the issue on Chrome. Works fine on Firefox.",
            createDate: "2025-08-20T11:02:00Z"
        },
        {
            commenter: "Charlie Davis",
            message: "Deployed a fix to staging, please re-test.",
            createDate: "2025-08-21T08:45:00Z"
        },
        {
            commenter: "Alice Johnson",
            message: "Retested on staging, issue seems resolved!",
            createDate: "2025-08-21T09:30:00Z"
        }
        ];
        setComments(ticketComments)

        const ticketHistory = [
        {
            property: "Status",
            oldValue: "Open",
            newValue: "In Progress",
            dateChanged: "2025-08-20T09:45:00Z"
        },
        {
            property: "Assigned To",
            oldValue: "Unassigned",
            newValue: "Bob Smith",
            dateChanged: "2025-08-20T10:30:00Z"
        },
        {
            property: "Priority",
            oldValue: "Low",
            newValue: "High",
            dateChanged: "2025-08-21T07:15:00Z"
        },
        {
            property: "Status",
            oldValue: "In Progress",
            newValue: "Resolved",
            dateChanged: "2025-08-22T14:20:00Z"
        }
        ];
        setHistory(ticketHistory)

        const ticketAttachments = [
        {
            file: "error_screenshot.png",
            uploader: "Alice Johnson",
            notes: "Screenshot showing the login error.",
            created: "2025-08-20T09:10:00Z"
        },
        {
            file: "server_logs.txt",
            uploader: "Bob Smith",
            notes: "Extract from backend logs during the issue.",
            created: "2025-08-20T09:50:00Z"
        },
        {
            file: "fix_patch.diff",
            uploader: "Charlie Davis",
            notes: "Proposed code fix for the bug.",
            created: "2025-08-21T12:05:00Z"
        },
        {
            file: "test_results.pdf",
            uploader: "Alice Johnson",
            notes: "QA verification results after patch applied.",
            created: "2025-08-21T15:30:00Z"
        }
        ];
        setAttachments(ticketAttachments)

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


    const commentRow = (commenter, message, createDate , priority, submitter, key) => {

        

        return (
        <div onClick={() =>{handleClick(title)}} key={key} 
        className='grid grid-cols-3 px-4 py-1 bg-white hover:bg-gray-100 border-t-1'
        >
            <p  className='self-center text-center p-1'>{commenter}</p>
            <p className='self-center text-center p-1'>{message}</p>
            <p className='self-center text-center p-1'>{createDate}</p>
        </div>
        );
    };

    
    const historyRow = (property, oldValue, newValue, dateChanged, key) => {

        

        return (
        <div onClick={() =>{handleClick(title)}} key={key} 
        className='grid grid-cols-4 px-4 py-1 bg-white hover:bg-gray-100 border-t-1'
        >
            <p  className='self-center text-center p-1'>{property}</p>
            <p  className='self-center text-center p-1'>{oldValue}</p>
            <p  className='self-center text-center p-1'>{newValue}</p>
            <p  className='self-center text-center p-1'>{dateChanged}</p>
        </div>
        );
    };
    return (
        <div>


            <div className='px-4 py-2 bg-white  rounded grid-rows-2  shadow-gray-900 h-auto min-w-[130]'>
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
                <div className='mt-5 px-4  py-2 bg-white  rounded grid-rows-2  shadow-gray-900 h-auto '>
                    
                    <div className="rounded bg-amber-300 flex items-center justify-between border-b-3 pt-5 pb-5">
                        <h1 className="font-bold text-3xl text-center flex-1">Ticket Details</h1>

                    </div>
                    <div className='grid grid-rows-4 '>
                        



                        <div className='grid grid-cols-2 p-4'>
                            <div className='grid grid-rows-2 '>
                                
                                <p className='m-auto h-auto font-bold'>Ticket Title</p>
                                <p className='m-auto h-auto '>Greate Work</p>
                            </div>
                            <div className='grid grid-rows-2 '>
                                
                                <p className='m-auto h-auto font-bold'>Ticket Description</p>
                                <p className='m-auto h-auto '>Words of admiration</p>
                            </div>
                        </div>





                        <div className='grid grid-cols-2 p-4 border-t-1'>
                            <div className='grid grid-rows-2 '>
                                
                                <p className='m-auto h-auto font-bold'>Assigned Developer</p>
                                <p className='m-auto h-auto '>Greate Work</p>
                            </div>
                            <div className='grid grid-rows-2 '>
                                
                                <p className='m-auto h-auto font-bold'>Submitter</p>
                                <p className='m-auto h-auto '>Words of admiration</p>
                            </div>
                        </div>





                        <div className='grid grid-cols-2 p-4 border-t-1'>
                            <div className='grid grid-rows-2 '>
                                
                                <p className='m-auto h-auto font-bold'>Project</p>
                                <p className='m-auto h-auto '>Greate Work</p>
                            </div>
                            <div className='grid grid-rows-2 '>
                                
                                <p className='m-auto h-auto font-bold'>Ticket Priority</p>
                                <p className='m-auto h-auto '>Words of admiration</p>
                            </div>
                        </div>





                        <div className='grid grid-cols-2 p-4 border-t-1'>
                            <div className='grid grid-rows-2 '>
                                
                                <p className='m-auto h-auto font-bold'>Ticket Status</p>
                                <p className='m-auto h-auto '>Open</p>
                            </div>
                            <div className='grid grid-rows-2 '>
                                
                                <p className='m-auto h-auto font-bold'>Ticket Type</p>
                                <p className='m-auto h-auto '>Words of admiration</p>
                            </div>
                        </div>





                        <div className='grid grid-cols-2 p-4 border-t-1'>
                            <div className='grid grid-rows-2 '>
                                
                                <p className='m-auto h-auto font-bold'>Created</p>
                                <p className='m-auto h-auto '>3/15/2025 9:16:14 Am</p>
                            </div>
                            <div className='grid grid-rows-2 '>
                                
                                <p className='m-auto h-auto font-bold'>Last Updated</p>
                                <p className='m-auto h-auto '>Words of admiration</p>
                            </div>
                        </div>

                    </div>
                    
                </div>

                {
                    //--------------------------------------------------------------------
                    //----------------------- Ticket Comments ----------------------------
                    //--------------------------------------------------------------------
                }
                <div className='mt-5 px-4 py-2 bg-white  rounded grid-rows-2 s shadow-gray-900 h-auto'>
                    <h1 className='bg-blue-300 rounded self-center text-center font-bold text-3xl pt-5 pb-5 border-b-3'>Ticket Comments</h1>  
                    <input type="text" className='border-1 m-3 p-1 rounded' />
                    <button className='bg-amber-300 p-1 rounded'>add</button>
                    <div className='grid grid-rows-4 '>
                        <div className='grid grid-cols-3  px-4 py-2 h-auto border-b-1'>
                            <p className='m-auto  h-auto font-bold'>Commenter</p>
                            <p className='m-auto h-auto font-bold'>Message</p>
                            <p className='m-auto h-auto font-bold'>Create Date</p>
                        </div>
                        {comments.map((ticket, index) =>
                            commentRow(ticket.commenter, ticket.message, ticket.createDate, index)
                        )}
                    </div>
                    
                </div>
            </div>



            
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 '>

                
                {
                    //------------------------------------------------------------
                    //----------------------- Ticket History ----------------------------
                    //------------------------------------------------------------
                }
                <div className='mt-5 px-4 py-2 bg-white  rounded grid-rows-2  shadow-gray-900 h-auto '>
                    <h1 className='bg-blue-300 rounded self-center text-center font-bold text-3xl pt-5 pb-5 border-b-3'>Ticket History</h1>  
                    <div className='grid grid-rows-4 '>
                    <div className='grid grid-cols-4  px-4 py-2 h-auto border-b-1'>
                        <p className='m-auto  h-auto font-bold'>Property</p>
                        <p className='m-auto h-auto font-bold'>Old Value</p>
                        <p className='m-auto h-auto font-bold'>New Value</p>
                        <p className='m-auto h-auto font-bold'>Date Changed</p>
                    </div>
                    {history.map((ticket, index) =>
                        historyRow(ticket.property, ticket.oldValue, ticket.newValue, ticket.dateChanged, index)
                    )}
                    </div>
                    
                </div>

                
                {
                    //------------------------------------------------------------
                    //----------------------- Ticket History ----------------------------
                    //------------------------------------------------------------
                }
                <div className='mt-5 px-4 py-2 bg-white  rounded grid-rows-2  shadow-gray-900 h-auto '>
                    <h1 className='bg-blue-300 rounded self-center text-center font-bold text-3xl pt-5 pb-5 border-b-3'>Ticket Attachment</h1>  
                    <input type="text" className='border-1 m-3 p-1 rounded' />
                    <button className='bg-amber-300 p-1 rounded'>add</button>

                    <div className='grid grid-rows-4 '>
                    <div className='grid grid-cols-4  px-4 py-2 h-auto border-b-1'>
                        <p className='m-auto  h-auto font-bold'>File</p>
                        <p className='m-auto h-auto font-bold'>Uploader</p>
                        <p className='m-auto h-auto font-bold'>Notes</p>
                        <p className='m-auto h-auto font-bold'>Created</p>
                    </div>
                    {attachements.map((ticket, index) =>
                        historyRow(ticket.file, ticket.uploader, ticket.notes, ticket.created,  index)
                    )}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProjectTicketDetails

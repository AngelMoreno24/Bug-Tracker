import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import Modal from "../components/Modal"; // adjust the path as needed
import AddTicketForm from "../components/forms/AddTicketForm";

import { getProjectMembers } from '../api/ProjectMemberAPI';
import { getTickets, createTicket } from '../api/TicketAPI';
import { getProjectById } from '../api/ProjectAPI';
import { useAuth } from "../hooks/useAuth";

const ProjectDetails = () => {
    const navigate = useNavigate();

    // retrieves token and user data from authContext
    const { user, token } = useAuth();

    const [addTicketOpen, setAddTicketOpen] = useState(false);

    const { id } = useParams();  // <-- grabs "id" from the URL

    const [users, setUsers] = useState([{}]);
    const [inviteId, setInviteId] = useState('');

    const [tickets, setTickets] = useState([]);

    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const [projectMembers, setProjectMembers] = useState([{}]);
 
    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                         Fetches destails for project, members, and tickets
    /////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (token) {
            fetchProjectDetails();
            fetchProjectMembers();
            fetchProjectTickets();
        }
    }, [token]);

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                          Project Details
    /////////////////////////////////////////////////////////////////////////////////////////////////


    const fetchProjectDetails = async () => {
        try {
            const projects = await getProjectById(id ,token); // 🔑 use token from context
            console.log(projects.project);
            const projectInfo = projects.project

            setProjectTitle(projectInfo.name)
            setProjectDescription(projectInfo.description)


        } catch (err) {
            console.error(err.message);
        }
    };


    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                          Member Details
    /////////////////////////////////////////////////////////////////////////////////////////////////
 
    const fetchProjectMembers = async () => {
        try {
            const members = await getProjectMembers(id ,token); // 🔑 use token from context
            console.log(members);

            setProjectMembers(members)


        } catch (err) {
            console.error(err.message);
        }
    };


    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                          Ticket Details
    /////////////////////////////////////////////////////////////////////////////////////////////////
 
    const fetchProjectTickets = async () => {
        try {
            const tickets = await getTickets(id ,token); // 🔑 use token from context
            console.log(tickets);
            console.log(tickets);
            console.log(tickets);
            console.log(tickets);
            console.log(tickets);
            console.log(tickets);
            console.log(tickets);
            console.log(tickets);

            setTickets(tickets)


        } catch (err) {
            console.error(err.message);
        }
    };



    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                          Add Ticket Handler
    /////////////////////////////////////////////////////////////////////////////////////////////////

    const [ticketForm, setTicketForm] = useState({ title: "", description: "", type: "bug", priority: "low" , projectId:id});

    const handleAddTicket = async () => {

        console.log(ticketForm)
    //const { projectId, title, description, priority, assignedTo } = req.body;
        await createTicket( ticketForm, token )
        await fetchProjectTickets()
        setTicketForm({ title: "", description: "", type: "bug", priority: "low"  });
        setAddTicketOpen(false);
    };







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

        if (userRole == roleCategory)
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


    const ticketRow = (title, type, priority, submitter, key, id) => {

        return (
            <div
                onClick={() => navigate(`/accounts/projects/ticket/${id}`)}
                key={key}
                className='grid grid-cols-4 px-4 py-2 bg-white hover:bg-gray-100 border-t-1'
            >
                <p className='self-center text-center'>{title}</p>
                <p className={`self-center text-center rounded w-20 m-auto text-white ${getTypeColor(type)}`}>{type}</p>
                <p className={`self-center text-center rounded w-20 m-auto text-white ${getPriorityColor(priority)}`}>{priority}</p>
                <p className='self-center text-center'>{submitter}</p>
            </div>
        );
    };
    return (
        <div>


            <div className='px-4 h-96 py-2 bg-white  rounded grid-rows-2  shadow-gray-900 h-auto min-w-[130]'>
                <h1 className='self-center text-center font-bold text-3xl pt-5 pb-5 border-b-3'>{projectTitle}</h1>
                <p className="px-4 py-2 self-center text-center">{projectDescription}</p>

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
                                {projectMembers.map((user, index) =>
                                    row(user.name, user.role, "Admin", index)
                                )}
                            </div>
                        </div>

                        <div>
                            <p className='m-auto h-auto font-bold'>Project Manager</p>
                            <div className="flex flex-wrap gap-2">
                                {projectMembers.map((user, index) =>
                                    row(user.name, user.role, "Manager", index)
                                )}
                            </div>
                        </div>

                        <div>
                            <p className='m-auto h-auto font-bold'>Developer</p>
                            <div className="flex flex-wrap gap-2">
                                {projectMembers.map((user, index) =>
                                    row(user.name, user.role, "Developer", index)
                                )}
                            </div>
                        </div>

                        <div>
                            <p className='m-auto h-auto font-bold'>Submitter</p>
                            <div className="flex flex-wrap gap-2">
                                {projectMembers.map((user, index) =>
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
                    <div className="flex items-center justify-between border-b-3 pt-5 pb-5">
                        <h1 className="font-bold text-3xl text-center flex-1">Tickets</h1>
 
                        <button 
                            className='px-4   bg-blue-500 hover:bg-blue-700 rounded transition h-8 text-white self-center text-center'
                            onClick={() => setAddTicketOpen(true)}
                        >
                            Add
                        </button>
                    </div>
                    <div className='grid grid-rows-4 '>
                        <div className='grid grid-cols-4  px-4 py-2 h-auto border-b-1'>
                            <p className='m-auto h-auto font-bold'>Title</p>
                            <p className='m-auto h-auto font-bold'>Type</p>
                            <p className='m-auto h-auto font-bold'>Priority</p>
                            <p className='m-auto h-auto font-bold'>Developer</p>
                        </div>
                        {tickets.map((ticket, index) =>
                            ticketRow(ticket.title, ticket.type, ticket.priority, ticket.assignedTo.name, index, ticket._id)
                        )}
                    </div>

                </div>
            </div>
            
            {/* Modals */}
            {addTicketOpen && (
                <Modal 
                title="Edit Ticket Details" 
                onClose={() => setAddTicketOpen(false)} 
                onSave={handleAddTicket}
                >
                <AddTicketForm 
                    ticketForm={ticketForm} 
                    setTicketForm={setTicketForm} 
                />
                </Modal>
            )}
        </div>
    )
}

export default ProjectDetails

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "../components/Modal";
import AddTicketForm from "../components/forms/AddTicketForm";
import { getProjectMembers } from '../api/ProjectMemberAPI';
import { getTickets, createTicket } from '../api/TicketAPI';
import { getProjectById } from '../api/ProjectAPI';
import { useAuth } from "../hooks/useAuth";

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const { id } = useParams();

    const [addTicketOpen, setAddTicketOpen] = useState(false);
    const [projectMembers, setProjectMembers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [ticketForm, setTicketForm] = useState({ title: "", description: "", type: "bug", priority: "low", projectId: id });

    useEffect(() => {
        if (token) {
            fetchProjectDetails();
            fetchProjectMembers();
            fetchProjectTickets();
        }
    }, [token]);

    const fetchProjectDetails = async () => {
        try {
            const projects = await getProjectById(id, token);
            const projectInfo = projects.project;
            setProjectTitle(projectInfo.name);
            setProjectDescription(projectInfo.description);
        } catch (err) {
            console.error(err.message);
        }
    };

    const fetchProjectMembers = async () => {
        try {
            const members = await getProjectMembers(id, token);
            setProjectMembers(members);
        } catch (err) {
            console.error(err.message);
        }
    };

    const fetchProjectTickets = async () => {
        try {
            const tickets = await getTickets(id, token);
            setTickets(tickets);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleAddTicket = async () => {
        await createTicket(ticketForm, token);
        await fetchProjectTickets();
        setTicketForm({ title: "", description: "", type: "bug", priority: "low", projectId: id });
        setAddTicketOpen(false);
    };

    const getColor = (role) => {
        switch (role) {
            case "Admin": return "bg-red-500 text-white font-semibold hover:bg-red-600";
            case "Manager": return "bg-orange-400 text-white font-semibold hover:bg-orange-500";
            case "Developer": return "bg-blue-500 text-white font-semibold hover:bg-blue-600";
            case "Submitter": return "bg-purple-500 text-white font-semibold hover:bg-purple-700";
            default: return "bg-gray-400 text-white font-semibold hover:bg-gray-600";
        }
    };

    const memberRow = (user, roleCategory, key) => {
        if (user.role !== roleCategory) return null;

        return (
            <div
                key={key}
                className={`relative group px-4 py-2 ${getColor(user.role)} rounded cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg flex items-center gap-2`}
            >
                <p className="font-medium">{user.name}</p>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap z-50">
                    Role: {user.role}{user.email ? ` | Email: ${user.email}` : ''}
                </div>
            </div>
        );
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "bug": return "bg-red-500 text-white";
            case "feature": return "bg-green-500 text-white";
            case "task": return "bg-blue-500 text-white";
            default: return "bg-gray-400 text-white";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "critical": return "bg-red-700 text-white";
            case "high": return "bg-red-500 text-white";
            case "medium": return "bg-yellow-400 text-black";
            case "low": return "bg-green-500 text-white";
            default: return "bg-gray-400 text-white";
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const ticketRow = (ticket, key) => {
        const { title, type, priority, assignedTo, createdAt, updatedAt, _id } = ticket;

        return (
            <div
                key={key}
                onClick={() => navigate(`/accounts/projects/${id}/${_id}`)}
                className='relative group grid grid-cols-4 px-4 py-3 bg-white border-b hover:bg-gray-50 cursor-pointer transition'
            >
                <p className='text-center self-center font-medium'>{title}</p>
                <p className={`text-center py-1 px-2 rounded w-24 m-auto ${getTypeColor(type)}`}>{type}</p>
                <p className={`text-center py-1 px-2 rounded w-24 m-auto ${getPriorityColor(priority)}`}>{priority}</p>
                <p className='text-center self-center'>{assignedTo?.name || "-"}</p>

                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap z-50">
                    Type: {type} | Priority: {priority} | Developer: {assignedTo?.name || "-"} | Created: {formatDate(createdAt)} | Updated: {formatDate(updatedAt)}
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen space-y-6">

            {/* Project Header */}
            <div className='bg-white rounded-lg shadow p-6'>
                <h1 className='text-3xl font-bold text-gray-800 mb-2 text-center'>{projectTitle}</h1>
                <p className='text-gray-600 text-center'>{projectDescription}</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

                {/* Members Section */}
                <div className='bg-white rounded-lg shadow p-6'>
                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Members</h2>
                        <button
                            onClick={() => navigate(`/accounts/projects/${id}/members`)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-1 shadow"
                        >
                            Edit
                        </button>
                    </div>
                    {["Admin", "Manager", "Developer", "Submitter"].map((role) => (
                        <div key={role} className="mb-4">
                            <h3 className="font-semibold mb-2">{role}</h3>
                            <div className="flex flex-wrap gap-2">
                                {projectMembers.map((user, index) =>
                                    memberRow(user, role, index)
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tickets Section */}
                <div className='bg-white rounded-lg shadow p-6'>
                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Tickets</h2>
                        <button 
                            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-1 shadow'
                            onClick={() => setAddTicketOpen(true)}
                        >
                            Add
                        </button>
                    </div>

                    {/* Tickets Table Header */}
                    <div className='grid grid-cols-4 px-4 py-2 bg-gray-200 font-semibold text-gray-700 rounded-t'>
                        <p className='text-center'>Title</p>
                        <p className='text-center'>Type</p>
                        <p className='text-center'>Priority</p>
                        <p className='text-center'>Developer</p>
                    </div>

                    {/* Tickets List */}
                    <div className='bg-white rounded-b'>
                        {tickets.map((ticket, index) =>
                            ticketRow(ticket, index)
                        )}
                    </div>
                </div>
            </div>

            {/* Add Ticket Modal */}
            {addTicketOpen && (
                <Modal 
                    title="Add Ticket" 
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

export default ProjectDetails;
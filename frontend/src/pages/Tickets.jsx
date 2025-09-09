import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { getAssignedTickets } from '../api/TicketAPI';

const Tickets = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const ticketList = await getAssignedTickets(token);
      // Sort tickets by createdAt descending (most recent first)
      const sortedTickets = ticketList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTickets(sortedTickets);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (token) fetchTickets();
  }, [token]);

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

  const row = (ticket, key) => {
    const { title, type, projectId, priority, createdBy, _id } = ticket;

    return (
      <div
        key={key}
        onClick={() => navigate(`/accounts/projects/ticket/${_id}`)}
        className="grid grid-cols-5 px-4 py-3 bg-white border-b hover:bg-gray-50 cursor-pointer transition"
      >
        <p className="text-center self-center">{title}</p>
        <p className={`text-center self-center px-2 py-1 rounded w-24 m-auto ${getTypeColor(type)}`}>{type}</p>
        <p className="text-center self-center">{projectId?.name || "-"}</p>
        <p className={`text-center self-center px-2 py-1 rounded w-24 m-auto ${getPriorityColor(priority)}`}>{priority}</p>
        <p className="text-center self-center">{createdBy?.name || "-"}</p>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">My Tickets</h1>

        {/* Table Header */}
        <div className="grid grid-cols-5 px-4 py-2 bg-gray-200 font-semibold text-gray-700 rounded-t">
          <p className="text-center">Title</p>
          <p className="text-center">Type</p>
          <p className="text-center">Project</p>
          <p className="text-center">Priority</p>
          <p className="text-center">Submitter</p>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-b shadow-inner">
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => row(ticket, index))
          ) : (
            <p className="text-center py-4 text-gray-500">No tickets assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
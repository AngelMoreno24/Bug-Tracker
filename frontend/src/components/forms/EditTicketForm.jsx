import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from "../../hooks/useAuth";

import { getProjectMembers } from "../../api/ProjectMemberAPI";

const EditTicketForm = ({ ticketForm, setTicketForm }) => {

  const { user, token } = useAuth();
  


  /////////////////////////////////////////////////////////////////////////////////////////////////
  //                                         Fetch Member Details
  /////////////////////////////////////////////////////////////////////////////////////////////////

const [projectMembers, setProjectMembers] = useState([]);


  const fetchProjectMembers = async () => {
    try {
      console.log(ticketForm.id)
      const members = await getProjectMembers(ticketForm.id, token); // 🔑 use token from context
      console.log(members);

      setProjectMembers(members)


    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    if (token) {
      fetchProjectMembers();
    }
  }, [token]);

  return (
    <div>
      {/* Title */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={ticketForm.title}
          onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={ticketForm.description}
          onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
        />
      </div>

      
      {/* AssignedTo Select */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">AssignTo</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={ticketForm.assignedTo || ""}
          onChange={(e) =>
            setTicketForm({ ...ticketForm, assignedTo: e.target.value })
          }
        >
          <option value="">Assign to User</option>
          {projectMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} ({member.role})
            </option>
          ))}
        </select>
      </div>
      
      {/* Status Select */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Type</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={ticketForm.status || ""}
          onChange={(e) =>
            setTicketForm({ ...ticketForm, status: e.target.value })
          }
        > 
          <option value="open">
            open
          </option>
          <option value={"in-progress"}>
            in-progress
          </option>
          <option value={"resolved"}>
            resolved
          </option>
          <option value={"closed"}>
            closed
          </option>
        </select>
      </div>
      
      {/* Type Select */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Type</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={ticketForm.type || ""}
          onChange={(e) =>
            setTicketForm({ ...ticketForm, type: e.target.value })
          }
        > 
          <option value="bug">
            bug
          </option>
          <option value={"feature"}>
            feature
          </option>
          <option value={"task"}>
            task
          </option>
          <option value={"improvement"}>
            improvement
          </option>
        </select>
      </div>
      
      {/* Priority Select */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Priority</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={ticketForm.priority || ""}
          onChange={(e) =>
            setTicketForm({ ...ticketForm, priority: e.target.value })
          }
        > 
          <option value="low">
            low
          </option>
          <option value={"medium"}>
            medium
          </option>
          <option value={"high"}>
            high
          </option>
          <option value={"critical"}>
            critical
          </option>
        </select>
      </div>
    </div>
  );
};

export default EditTicketForm;

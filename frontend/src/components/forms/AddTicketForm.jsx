import React from "react"; 

const AddTicketForm = ({ ticketForm, setTicketForm }) => {
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

export default AddTicketForm;

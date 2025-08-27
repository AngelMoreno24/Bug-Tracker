import React from "react";

const EditTicketForm = ({ ticketForm, setTicketForm }) => {
  return (
    <div>
      {Object.entries(ticketForm).map(([key, value]) => (
        <div key={key} className="mb-3">
          <label className="block text-sm font-semibold mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={value}
            onChange={(e) => setTicketForm({ ...ticketForm, [key]: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
};

export default EditTicketForm;

import React from "react";

const AddProjectForm = ({ projectForm, setProjectForm }) => {
  return (
    <div>
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={projectForm.title}
          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={projectForm.description}
          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
        />
      </div>
    </div>
  );
};

export default AddProjectForm;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from "../../hooks/useAuth";

import { getProjectMembers, removeProjectMember } from "../../api/ProjectMemberAPI";


const EditProjectMemberForm = ({ editProjectMemberForm, setEditProjectMemberForm, onDelete }) => {
  const { token } = useAuth();
  const { id } = useParams();

  const remove = async () => {
    const success = await removeProjectMember(id, editProjectMemberForm.userId, token);
    if (success && onDelete) {
      onDelete(); // ✅ refresh + close modal handled by parent
    }
  };

  return (
    <div>
      {/* Role Select */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Role</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={editProjectMemberForm.role || ""}
          required
          onChange={(e) =>
            setEditProjectMemberForm({ ...editProjectMemberForm, role: e.target.value })
          }
        >
          <option value="" disabled hidden>Choose a Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Submitter">Submitter</option>
        </select>

        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-3"
          onClick={remove}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditProjectMemberForm;
import React, { useEffect, useState } from "react";
import { getMyCompanies } from "../../api/CompanyMemberAPI";
import { useAuth } from "../../hooks/useAuth";

const AddProjectMemberForm = ({ projectMemberForm, setProjectMemberForm }) => {

  return (
    <div>
      
      {/* Role Select */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Role</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={projectMemberForm.role || ""}
          onChange={(e) =>
            setProjectMemberForm({ ...projectMemberForm, role: e.target.value })
          }
        > 
          <option value={"Developer"}>
            Developer
          </option>
          <option value="Manager">
            Manager
          </option>
        </select>
      </div>
    </div>
  );
};

export default AddProjectMemberForm;
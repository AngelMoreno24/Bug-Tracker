import React, { useEffect, useState } from "react";
import { getMyCompanies } from "../../api/CompanyMemberAPI";
import { useAuth } from "../../hooks/useAuth";

const AddProjectForm = ({ projectForm, setProjectForm }) => {
  const { token } = useAuth();  
  const [companies, setCompanies] = useState([]);  // store companies

  const fetchCompanies = async () => {
    try {
      const data = await getMyCompanies(token);
      console.log("Companies response:", data);

      if (data && Array.isArray(data.companies)) {
        setCompanies(data.companies); // directly store array of {companyId, companyName, role}
      }
    } catch (err) {
      console.error("Failed to fetch companies:", err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCompanies();
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
          value={projectForm.title}
          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={projectForm.description}
          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
        />
      </div>

      {/* Company Select */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Company</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={projectForm.companyId || ""}
          onChange={(e) =>
            setProjectForm({ ...projectForm, companyId: e.target.value })
          }
        >
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.companyId} value={company.companyId}>
              {company.companyName} ({company.role})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddProjectForm;
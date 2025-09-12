import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth"; 
import { getPossibleProjectMembers, getProjectMembers, addProjectMember, editProjectMember } from '../api/ProjectMemberAPI';
import AddProjectMemberForm from "../components/forms/AddProjectMemberForm";
import EditProjectMemberForm from "../components/forms/EditProjectMemberForm";
import Modal from "../components/Modal";

const UserManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const [users, setUsers] = useState([]);
  const [unassignedProjectMembers, setUnassignedProjectMembers] = useState([]);

  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [addProjectMemberOpen, setAddProjectMemberOpen] = useState(false);
  const [editProjectMemberOpen, setEditProjectMemberOpen] = useState(false);

  const [projectMemberForm, setProjectMemberForm] = useState({});
  const [editProjectMemberForm, setEditProjectMemberForm] = useState({});

  useEffect(() => {
    if (token) {
      fetchProjectMembers();
      fetchPossibleProjectMembers();
    }
  }, [token]);

  const fetchProjectMembers = async () => {
    try {
      const members = await getProjectMembers(id, token);
      setUsers(members);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchPossibleProjectMembers = async () => {
    try {
      const members = await getPossibleProjectMembers(id, token);
      setUnassignedProjectMembers(members);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddProjectMember = async () => {
    await addProjectMember(id, projectMemberForm.id, projectMemberForm.role, token);
    fetchProjectMembers();
    fetchPossibleProjectMembers();
    setProjectMemberForm({ name: "", role: "" });
    setAddProjectMemberOpen(false);
  };

  const handleEditProjectMember = async () => {
    await editProjectMember(id, editProjectMemberForm.id, editProjectMemberForm.role, token);
    fetchProjectMembers();
    fetchPossibleProjectMembers();
    setEditProjectMemberForm({ name: "", role: "" });
    setEditProjectMemberOpen(false);
  };

  const getColor = (role) => {
    switch (role) {
      case "Admin": return "bg-red-500 text-white hover:bg-red-600";
      case "Manager": return "bg-orange-400 text-white hover:bg-orange-500";
      case "Developer": return "bg-blue-500 text-white hover:bg-blue-600";
      case "Submitter": return "bg-purple-500 text-white hover:bg-purple-700";
      default: return "bg-gray-400 text-white hover:bg-gray-600";
    }
  };

  const badgeRow = (user, roleCategory, clickHandler) => {
    if (roleCategory && user.role !== roleCategory) return null;
    return (
      <div
        key={user.id}
        onClick={clickHandler}
        className={`px-4 py-2 ${getColor(user.role)} rounded cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md relative`}
      >
        {user.name}
        {/* Tooltip */}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {user.role} - {user.email || "No email"}
        </span>
      </div>
    );
  };

  // Filter and search users
  const filteredUnassigned = useMemo(() => {
    return unassignedProjectMembers
      .filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "" || u.name.toUpperCase().startsWith(filter))
      );
  }, [unassignedProjectMembers, searchTerm, filter]);

  const filteredAssigned = useMemo(() => {
    return users
      .filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "" || u.name.toUpperCase().startsWith(filter))
      );
  }, [users, searchTerm, filter]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-64 shadow-sm"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2 bg-white shadow"
        >
          <option value="">All</option>
          {Array.from({ length: 26 }, (_, i) => {
            const letter = String.fromCharCode(65 + i);
            return <option key={letter} value={letter}>{letter}</option>;
          })}
        </select>
      </div>

      {/* Unassigned Users */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Unassigned Users</h2>
        <div className="flex flex-wrap gap-2">
          {filteredUnassigned.map(user =>
            badgeRow(user, "", () => {
              setAddProjectMemberOpen(true);
              setProjectMemberForm({ name: user.name, role: "Developer", id: user.id });
            })
          )}
          {filteredUnassigned.length === 0 && (
            <p className="text-gray-500">No users found.</p>
          )}
        </div>
      </div>

      {/* Assigned Users */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Assigned Users</h2>
        {["Admin", "Manager", "Developer", "Submitter"].map(role => (
          <div key={role} className="mb-4">
            <h3 className="font-semibold mb-2">{role}</h3>
            <div className="flex flex-wrap gap-2">
              {filteredAssigned.map(user =>
                badgeRow(user, role, () => {
                  setEditProjectMemberOpen(true);
                  setEditProjectMemberForm({
                    name: user.name,
                    role: user.role,
                    id: user.memberId,
                    userId: user.id
                  });
                })
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Member Modal */}
      {addProjectMemberOpen && (
        <Modal
          title={`Add ${projectMemberForm.name}`}
          onClose={() => setAddProjectMemberOpen(false)}
          onSave={handleAddProjectMember}
        >
          <AddProjectMemberForm
            projectMemberForm={projectMemberForm}
            setProjectMemberForm={setProjectMemberForm}
          />
        </Modal>
      )}

      {/* Edit Project Member Modal */}
      {editProjectMemberOpen && (
        <Modal
          title={`Edit ${editProjectMemberForm.name}`}
          onClose={() => setEditProjectMemberOpen(false)}
          onSave={handleEditProjectMember}
        >
          <EditProjectMemberForm
            editProjectMemberForm={editProjectMemberForm}
            setEditProjectMemberForm={setEditProjectMemberForm}
            onDelete={async () => {
              setEditProjectMemberOpen(false);
              await fetchProjectMembers();
              await fetchPossibleProjectMembers();
            }}
          />
        </Modal>
      )}

    </div>
  );
};

export default UserManager;
import React, { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";
import { listCompanyMembers, addCompanyMember } from '../api/CompanyMemberAPI';

const UserManager = () => {
  const { token, user: currentUser } = useAuth();
  const [projectMembers, setProjectMembers] = useState([]);
  const [inviteId, setInviteId] = useState('');

  // Fetch members
  useEffect(() => {
    if (token) fetchProjectMembers();
  }, [token]);

  const fetchProjectMembers = async () => {
    try {
      const res = await listCompanyMembers(token);
      let members = res?.members || [];

      // Optional: remove current user
      if (currentUser?._id) members = members.filter(u => u._id !== currentUser._id);

      setProjectMembers(members);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handle adding a new member
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inviteId) return;
    await addCompanyMember(inviteId, "Developer", token);
    setInviteId('');
    fetchProjectMembers();
  };

  // Button coloring like ProjectMember UserManager
  const getColor = (index) => {
    const colors = [
      "bg-red-500 text-white hover:bg-red-600",
      "bg-orange-400 text-white hover:bg-orange-500",
      "bg-blue-500 text-white hover:bg-blue-600",
      "bg-purple-500 text-white hover:bg-purple-700",
      "bg-teal-500 text-white hover:bg-teal-600",
      "bg-indigo-500 text-white hover:bg-indigo-600",
      "bg-pink-500 text-white hover:bg-pink-600",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* Add Member Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Company Manager</h1>
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 justify-center">
          <input
            type="text"
            className="border rounded px-3 py-2 w-64"
            placeholder="Enter user email..."
            value={inviteId}
            onChange={(e) => setInviteId(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Company Members</h1>
        <div className="flex flex-wrap gap-3 justify-center">
          {projectMembers.length > 0 ? (
            projectMembers.map((user, index) => (
              <div
                key={user._id || index}
                className={`px-4 py-2 rounded-lg shadow hover:shadow-md transition cursor-pointer ${getColor(index)}`}
              >
                {user.name}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">No members found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManager;
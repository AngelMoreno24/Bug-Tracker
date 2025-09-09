import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  // Dummy data — replace with API later
  const stats = {
    projects: 5,
    activeProjects: 3,
    tickets: 42,
    openTickets: 18,
    closedTickets: 20,
    inProgressTickets: 4,
  };

  // Pie chart data: ticket status breakdown
  const ticketStatusData = [
    { name: "Open", value: stats.openTickets },
    { name: "In Progress", value: stats.inProgressTickets },
    { name: "Closed", value: stats.closedTickets },
  ];

  const COLORS = ["#ef4444", "#f59e0b", "#4b5563"]; // red, yellow, gray

  // Bar chart data: tickets by priority
  const ticketsByPriority = [
    { priority: "Critical", count: 3 },
    { priority: "High", count: 12 },
    { priority: "Medium", count: 15 },
    { priority: "Low", count: 12 },
  ];

  // Recent tickets table (dummy data)
  const recentTickets = [
    { id: 1, title: "Login Bug", status: "Open", assignee: "Alice" },
    { id: 2, title: "UI Overlap", status: "In Progress", assignee: "Bob" },
    { id: 3, title: "API Timeout", status: "Closed", assignee: "Charlie" },
    { id: 4, title: "Dashboard Styling", status: "Open", assignee: "Diana" },
    { id: 5, title: "Notification Error", status: "Closed", assignee: "Eve" },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Project Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Total Projects</p>
          <p className="text-4xl font-bold text-blue-500">{stats.projects}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Active Projects</p>
          <p className="text-4xl font-bold text-green-500">
            {stats.activeProjects}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Total Tickets</p>
          <p className="text-4xl font-bold text-indigo-500">{stats.tickets}</p>
        </div>
      </div>

      {/* Ticket Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Open Tickets</p>
          <p className="text-4xl font-bold text-red-500">
            {stats.openTickets}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">In Progress</p>
          <p className="text-4xl font-bold text-yellow-500">
            {stats.inProgressTickets}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Closed Tickets</p>
          <p className="text-4xl font-bold text-gray-700">
            {stats.closedTickets}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Tickets by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                label
              >
                {ticketStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Tickets by Priority</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ticketsByPriority}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="priority" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tickets Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Tickets</h2>
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Assignee</th>
            </tr>
          </thead>
          <tbody>
            {recentTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{ticket.title}</td>
                <td className="py-2 px-4 border-b">{ticket.status}</td>
                <td className="py-2 px-4 border-b">{ticket.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
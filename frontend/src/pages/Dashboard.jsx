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
  tickets: 42,
  openTickets: 18,
  closedTickets: 20,
  inProgressTickets: 4,
  unassignedTickets: 6,
  };

  // Pie chart data: ticket status breakdown
  const ticketStatusData = [
    { name: "Open", value: stats.openTickets },
    { name: "In Progress", value: stats.inProgressTickets },
    { name: "Closed", value: stats.closedTickets },
  ];

  const STATUS_COLORS = ["#ef4444", "#f59e0b", "#4b5563"]; // red, yellow, gray

  // Bar chart data: tickets by priority
  const ticketsByPriority = [
    { priority: "Critical", count: 3 },
    { priority: "High", count: 12 },
    { priority: "Medium", count: 15 },
    { priority: "Low", count: 12 },
  ];

  const PRIORITY_COLORS = {
    Critical: "#000000",
    High: "#ef4444",
    Medium: "#facc15",
    Low: "#22c55e",
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Project Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Total Projects</p>
          <p className="text-4xl font-bold text-blue-500">{stats.projects}</p>
        </div>

        {/* 🔄 Swapped out Active Projects for Unassigned Tickets */}
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Unassigned Tickets</p>
          <p className="text-4xl font-bold text-orange-500">
            {stats.unassignedTickets}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    fill={STATUS_COLORS[index % STATUS_COLORS.length]}
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
              <Bar dataKey="count" barSize={40}>
                {ticketsByPriority.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PRIORITY_COLORS[entry.priority]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
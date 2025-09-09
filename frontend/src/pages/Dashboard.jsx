import React, { useState, useEffect } from "react";
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

import { useAuth } from "../hooks/useAuth";
import { getDashboardStats } from "../api/DashboardAPI";

const Dashboard = () => {
  const { token } = useAuth();

  const [stats, setStats] = useState({});
  const [ticketStatusData, setTicketStatusData] = useState([]);
  const [ticketsByPriority, setTicketsByPriority] = useState([]);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      const retrievedStats = await getDashboardStats(token);

      setStats(retrievedStats);

      // Pie chart data: ticket status breakdown
      setTicketStatusData([
        { name: "Open", value: retrievedStats.openTickets || 0 },
        { name: "In Progress", value: retrievedStats.inProgressTickets || 0 },
        { name: "Closed", value: retrievedStats.closedTickets || 0 },
      ]);

      // Bar chart data: tickets by priority
      setTicketsByPriority([
        { priority: "Critical", count: retrievedStats.criticalTickets || 0 },
        { priority: "High", count: retrievedStats.highTickets || 0 },
        { priority: "Medium", count: retrievedStats.mediumTickets || 0 },
        { priority: "Low", count: retrievedStats.lowTickets || 0 },
      ]);
    } catch (err) {
      console.error("Error fetching dashboard data:", err.message);
    }
  };

  const STATUS_COLORS = ["#ef4444", "#f59e0b", "#4b5563"]; // red, yellow, gray

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
          <p className="text-4xl font-bold text-blue-500">{stats.projects || 0}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Unassigned Tickets</p>
          <p className="text-4xl font-bold text-orange-500">
            {stats.unassignedTickets || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Total Tickets</p>
          <p className="text-4xl font-bold text-indigo-500">{stats.tickets || 0}</p>
        </div>
      </div>

      {/* Ticket Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Open Tickets</p>
          <p className="text-4xl font-bold text-red-500">{stats.openTickets || 0}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">In Progress</p>
          <p className="text-4xl font-bold text-yellow-500">{stats.inProgressTickets || 0}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 text-lg font-medium">Closed Tickets</p>
          <p className="text-4xl font-bold text-gray-700">{stats.closedTickets || 0}</p>
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
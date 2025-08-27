import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X, Home, Folder, Ticket, Building } from "lucide-react"; // icons

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-gray-800 text-white p-4 flex flex-col transition-all duration-300`}
      >
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center mb-4 p-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>

        {/* Links */}
        <Link
          to="/accounts/"
          className="flex items-center px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 transition mb-2"
        >
          <Home size={20} className="mr-2" />
          {!collapsed && "Dashboard"}
        </Link>

        <Link
          to="/accounts/projects"
          className="flex items-center px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 transition mb-2"
        >
          <Folder size={20} className="mr-2" />
          {!collapsed && "My Projects"}
        </Link>

        <Link
          to="/accounts/mytickets"
          className="flex items-center px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 transition mb-2"
        >
          <Ticket size={20} className="mr-2" />
          {!collapsed && "My Tickets"}
        </Link>

        <Link
          to="/accounts/companymanager"
          className="flex items-center px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
        >
          <Building size={20} className="mr-2" />
          {!collapsed && "Company Manager"}
        </Link>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-200 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 bg-white px-4 rounded shadow mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add Ticket
            </button>
            <button className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
              Settings
            </button>
          </div>
        </div>

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
}
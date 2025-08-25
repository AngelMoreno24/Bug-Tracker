import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-899">
      {/* Sidebar Navbar */}
      <nav className="w-64 bg-gray-800 text-white p-4 flex flex-col space-y-2">
        <Link
          to="/accounts/"
          className=" px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/accounts/projects"
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
        >
          My Projects
        </Link>
        <Link
          to="/accounts/mytickets"
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
        >
          My Tickets
        </Link>
        <Link
          to="/accounts/companymanager"
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
        >
          Company Manager
        </Link>
      </nav>
      
      {/* Main content */}
      <main className="flex-1  p-6 bg-gray-200 overflow-y-auto ">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 bg-white px-4 rounded shadow mb-6">
          {/* Page Title */}
          <h1 className="text-2xl font-bold">Dashboard</h1>

          {/* Placeholder for buttons */}
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
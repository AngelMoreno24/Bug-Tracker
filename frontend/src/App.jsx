import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Layout from './components/layout';
import Tickets from './pages/Tickets';
import UserManager from './pages/UserManager';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import ProjectMemberManager from './pages/ProjectMemberManager';
import ProjectTicketDetails from './pages/ProjectTicketDetails';


function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes
      >
        <Route index element={<Login />} />
        <Route path="register" element={<Signup />} />

        <Route path="accounts">
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="mytickets" element={<Tickets />} />
            <Route path="companymanager" element={<UserManager />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="projects/:id/members" element={<ProjectMemberManager />} />
            <Route path="projects/ticket/:id" element={<ProjectTicketDetails />} />
            
          </Route>
        </Route>
      </Routes>
  )
}

export default App

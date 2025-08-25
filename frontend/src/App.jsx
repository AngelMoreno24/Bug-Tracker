import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import EntryLayout from './components/EntryLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Layout from './components/layout';
import Tickets from './pages/Tickets';
import UserManager from './pages/UserManager';
import Projects from './pages/Projects';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<EntryLayout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="accounts">
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="mytickets" element={<Tickets />} />
            <Route path="companymanager" element={<UserManager />} />
            <Route path="projects" element={<Projects />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/Announcements";
import Community from "./pages/Community";
import Events from "./pages/Events";
import Files from "./pages/Files";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

// Future: Role-Based Dashboards
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";
// import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main App Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/community" element={<Community />} />
        <Route path="/events" element={<Events />} />
        <Route path="/files" element={<Files />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />

        {/* Future Role-Based Dashboards */}
        {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
        {/* <Route path="/teacher-dashboard" element={<TeacherDashboard />} /> */}
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

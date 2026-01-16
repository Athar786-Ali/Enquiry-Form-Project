import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";
import TaskManager from "./dashboard/TaskManager";
import Enquiry from "./Enquiry";
import PrivateRoute from "./auth/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />

        <Route path="/tasks" element={
          <PrivateRoute><TaskManager /></PrivateRoute>
        } />

        <Route path="/enquiries" element={
          <PrivateRoute><Enquiry /></PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}


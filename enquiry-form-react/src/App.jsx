import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";
import TaskManager from "./dashboard/TaskManager";
import Enquiry from "./Enquiry";
import PrivateRoute from "./auth/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function App() {
  return (
    // Is div mein background color force kiya hai
    <div className="min-h-screen w-full bg-[#f8fafc] selection:bg-indigo-100">
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={3000} /> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
    </div>
  );
}
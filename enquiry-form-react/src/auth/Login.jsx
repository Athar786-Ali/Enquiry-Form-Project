import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { HiMail, HiLockClosed } from "react-icons/hi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const loginUser = async () => {
    try {
      const res = await API.post("/user/login", form);
      if (res.data.status === 1) {
        localStorage.setItem("token", res.data.token);
        toast.success("Welcome Back!");
        setTimeout(() => {
         window.location.assign("/dashboard");
         }, 300);

      } else {
        toast.error(res.data.msg);
      }
    } catch (err) { toast.error("Server Error"); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
     <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">G</div>
          <h2 className="text-3xl font-black text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Sign in to manage your refrigeration business</p>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <HiMail className="absolute left-3 top-3.5 text-slate-400 text-xl" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
            />
          </div>
          <div className="relative">
            <HiLockClosed className="absolute left-3 top-3.5 text-slate-400 text-xl" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
            />
          </div>
          <button 
            onClick={loginUser} 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all text-lg"
          >
            Sign In
          </button>
        </div>

        <p className="mt-8 text-center text-slate-600">
          New here? <a href="/register" className="text-indigo-600 font-bold hover:underline">Create an account</a>
        </p>
      </div>
    </div>
  );
}
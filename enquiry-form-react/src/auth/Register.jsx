import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  const registerUser = () => {
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    API.post("/user/register", form)
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(res.data.msg);
          window.location.href = "/";
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch(() => {
        toast.error("Registration failed");
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="p-10 bg-white rounded-2xl shadow-xl w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">G</div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Create Account</h2>
          <p className="text-slate-500">Join us to manage your business</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <HiUser className="absolute left-3 top-3.5 text-slate-400 text-xl" />
            <input
              placeholder="Full Name"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="relative">
            <HiMail className="absolute left-3 top-3.5 text-slate-400 text-xl" />
            <input
              type="email"
              placeholder="Email"
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

          <div className="relative">
            <HiLockClosed className="absolute left-3 top-3.5 text-slate-400 text-xl" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all"
            onClick={registerUser}
          >
            Register
          </button>
        </div>

        <p className="mt-6 text-center text-slate-600">
          Already have an account? <a href="/" className="text-indigo-600 font-bold hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}
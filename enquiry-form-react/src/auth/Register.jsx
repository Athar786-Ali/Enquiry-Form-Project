import { useState } from "react";
import axios from "axios";
import API from "../api";

import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: ""
  });

  const registerUser = () => {
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    axios.post(`${API}/user/register`, form)
      .then(res => {
        if (res.data.status === 1) {
          toast.success(res.data.msg);
          window.location.href = "/";
        } else {
          toast.error(res.data.msg);
        }
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input placeholder="Full Name" className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input type="password" placeholder="Confirm Password" className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />

        <button className="w-full bg-green-600 text-white py-2 rounded"
          onClick={registerUser}>
          Register
        </button>

      </div>
    </div>
  );
}

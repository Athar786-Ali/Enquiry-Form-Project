import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const loginUser = () => {
    API.post("/user/login", form)
      .then((res) => {
        if (res.data.status === 1) {
          localStorage.setItem("token", res.data.token);
          toast.success("Login successful");
          window.location.href = "/dashboard";
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch(() => {
        toast.error("Error");
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={loginUser}
        >
          Login
        </button>

        <p className="mt-3 text-center">
          No account?{" "}
          <a href="/register" className="text-blue-600">
            Register
          </a>
        </p>

      </div>
    </div>
  );
}

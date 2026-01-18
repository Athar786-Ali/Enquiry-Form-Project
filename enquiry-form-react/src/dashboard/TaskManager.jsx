import React, { useState, useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";
import {
  HiPlus,
  HiTrash,
  HiCheckCircle,
  HiCalendar,
  HiCollection
} from "react-icons/hi";

export default function TaskManager() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: ""
  });

  // 🔴 CHECK OVERDUE
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dueDate) < today;
  };

  // 🔄 LOAD TASKS
  const loadTasks = async () => {
    try {
      const res = await API.get("/task/list");
      setList(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ➕ ADD TASK
  const addTask = async (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      return toast.warning("Title is required");
    }

    if (!task.dueDate) {
      return toast.warning("Please select a deadline");
    }

    try {
      await API.post("/task/add", task);
      setTask({ title: "", description: "", priority: "Low", dueDate: "" });
      loadTasks();
      toast.success("Task added successfully!");
    } catch {
      toast.error("Error adding task");
    }
  };

  // ✅ TOGGLE STATUS
  const toggleTask = async (item) => {
    const newStatus = item.status === "pending" ? "completed" : "pending";
    await API.put(`/task/update/${item._id}`, { status: newStatus });
    loadTasks();
  };

  // 🗑 DELETE TASK
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await API.delete(`/task/delete/${id}`);
      loadTasks();
      toast.info("Task deleted");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-screen">

      {/* 📊 STATS */}
      <div className="flex gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-xl flex-1 p-6 text-center border-b-4 border-indigo-500">
          <p className="text-xs font-bold uppercase text-slate-500">Pending</p>
          <h3 className="text-3xl font-black">
            {list.filter(t => t.status !== "completed").length}
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-xl flex-1 p-6 text-center border-b-4 border-green-500">
          <p className="text-xs font-bold uppercase text-slate-500">Completed</p>
          <h3 className="text-3xl font-black">
            {list.filter(t => t.status === "completed").length}
          </h3>
        </div>
      </div>

      {/* 📝 FORM */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-10 border-t-4 border-indigo-500">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <HiCollection className="text-indigo-600" />
          Create New Task
        </h2>

        <form onSubmit={addTask} className="space-y-5">
          <input
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Task title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />

          <input
            type="date"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />

          <textarea
            className="w-full px-4 py-3 border border-slate-200 rounded-xl resize-none min-h-[100px]"
            placeholder="Task description"
            value={task.description}
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
          />

          <select
            className="w-full px-4 py-3 border border-slate-200 rounded-xl"
            value={task.priority}
            onChange={(e) =>
              setTask({ ...task, priority: e.target.value })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2"
          >
            <HiPlus /> Add Task
          </button>
        </form>
      </div>

      {/* 📋 TASK LIST */}
      <div className="space-y-4">
        {list.map((t) => (
          <div
            key={t._id}
            className={`rounded-2xl shadow-xl p-5 flex justify-between items-center
              ${
                t.status === "completed"
                  ? "bg-green-50 opacity-70"
                  : isOverdue(t.dueDate)
                  ? "bg-red-50 border-l-4 border-red-500"
                  : "bg-white"
              }`}
          >
            <div className="flex gap-4 items-start">
              <button
                onClick={() => toggleTask(t)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                  ${
                    t.status === "completed"
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-slate-300"
                  }`}
              >
                {t.status === "completed" && <HiCheckCircle />}
              </button>

              <div>
                <h4
                  className={`font-bold ${
                    t.status === "completed"
                      ? "line-through text-slate-400"
                      : "text-slate-800"
                  }`}
                >
                  {t.title}
                </h4>

                <p
                  className={`text-xs flex items-center gap-1 font-semibold
                    ${
                      isOverdue(t.dueDate)
                        ? "text-red-600"
                        : "text-slate-500"
                    }`}
                >
                  <HiCalendar />
                  {t.dueDate
                    ? new Date(t.dueDate).toLocaleDateString()
                    : "No deadline"}
                  {isOverdue(t.dueDate) && " (Overdue)"}
                </p>

                <span className="text-[10px] font-black uppercase text-indigo-600">
                  {t.priority}
                </span>
              </div>
            </div>

            <button
              onClick={() => deleteTask(t._id)}
              className="p-2 text-red-400 hover:text-red-600 transition"
            >
              <HiTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

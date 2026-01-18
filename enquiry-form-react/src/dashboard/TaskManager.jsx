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
    return new Date(dueDate) < new Date().setHours(0, 0, 0, 0);
  };

  // 🔄 LOAD TASKS
  const loadTasks = async () => {
    try {
      const res = await API.get("/task/list");
      setList(res.data.data || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to connect to database");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ➕ ADD TASK
  const addTask = async (e) => {
    e.preventDefault();
    if (!task.title) return toast.warning("Title is required");

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

  // 🗑 DELETE
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await API.delete(`/task/delete/${id}`);
      loadTasks();
      toast.info("Task deleted");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-screen">

      {/* STATS */}
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

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border-t-4 border-indigo-500">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <HiCollection className="text-indigo-600" /> Create New Task
        </h2>

        <form onSubmit={addTask} className="space-y-6">
          <input
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Task title"
            value={task.title}
            onChange={e => setTask({ ...task, title: e.target.value })}
          />

          <input
            type="date"
            className="w-full px-4 py-3 border rounded-xl"
            value={task.dueDate}
            onChange={e => setTask({ ...task, dueDate: e.target.value })}
          />

          <textarea
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Description"
            value={task.description}
            onChange={e => setTask({ ...task, description: e.target.value })}
          />

          <select
            className="w-full px-4 py-3 border rounded-xl"
            value={task.priority}
            onChange={e => setTask({ ...task, priority: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl flex justify-center gap-2">
            <HiPlus /> Add Task
          </button>
        </form>
      </div>

      {/* TASK LIST */}
      <div className="space-y-4">
        {list.map(t => (
          <div
            key={t._id}
            className={`p-5 rounded-2xl shadow-xl flex justify-between items-center
              ${
                t.status === "completed"
                  ? "bg-green-50 opacity-70"
                  : isOverdue(t.dueDate)
                  ? "bg-red-50 border border-red-300"
                  : "bg-white"
              }`}
          >
            <div className="flex gap-4 items-start">
              <button
                onClick={() => toggleTask(t)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                  ${t.status === "completed" && "bg-green-500 text-white"}`}
              >
                {t.status === "completed" && <HiCheckCircle />}
              </button>

              <div>
                <h4 className={`font-bold ${t.status === "completed" && "line-through text-slate-400"}`}>
                  {t.title}
                </h4>

                <p
                  className={`text-xs flex items-center gap-1
                    ${isOverdue(t.dueDate) ? "text-red-600 font-bold" : "text-slate-500"}`}
                >
                  <HiCalendar />
                  {t.dueDate ? t.dueDate.split("T")[0] : "No deadline"}
                  {isOverdue(t.dueDate) && " (Overdue)"}
                </p>

                <span className="text-[10px] font-black uppercase">
                  {t.priority}
                </span>
              </div>
            </div>

            <button
              onClick={() => deleteTask(t._id)}
              className="p-2 text-red-400 hover:text-red-600"
            >
              <HiTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


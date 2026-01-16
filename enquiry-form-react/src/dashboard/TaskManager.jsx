import { useState, useEffect } from "react";
import axios from "axios";
import API from "../api";

export default function TaskManager() {

  // ===============================
  // STATE
  // ===============================
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low"
  });

  const [list, setList] = useState([]);

  // ===============================
  // TOKEN (JWT)
  // ===============================
  const token = localStorage.getItem("token");

  // ===============================
  // ADD TASK
  // ===============================
  const addTask = async () => {
    try {
      await axios.post(
        `${API}/task/add`,
        task,
        {
          headers: {
            "auth-token": token
          }
        }
      );

      // clear form
      setTask({ title: "", description: "", priority: "Low" });

      loadTasks();
    } catch (error) {
      console.error("Add task error:", error);
      alert("Error adding task");
    }
  };

  // ===============================
  // LOAD TASKS
  // ===============================
  const loadTasks = async () => {
    try {
      const res = await axios.get(
        `${API}/task/list`,
        {
          headers: {
            "auth-token": token
          }
        }
      );

      setList(res.data.data);
    } catch (error) {
      console.error("Load task error:", error);
      alert("Error loading tasks");
    }
  };

  // ===============================
  // USE EFFECT
  // ===============================
  useEffect(() => {
    loadTasks();
  }, []);

  // ===============================
  // UI
  // ===============================
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Task Manager</h2>

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Title"
        value={task.title}
        onChange={(e) =>
          setTask({ ...task, title: e.target.value })
        }
      />

      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Description"
        value={task.description}
        onChange={(e) =>
          setTask({ ...task, description: e.target.value })
        }
      />

      <select
        className="w-full p-2 border rounded mb-4"
        value={task.priority}
        onChange={(e) =>
          setTask({ ...task, priority: e.target.value })
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded mb-6 hover:bg-blue-700"
        onClick={addTask}
      >
        Add Task
      </button>

      <ul>
        {list.length > 0 ? (
          list.map((t) => (
            <li
              key={t._id}
              className="p-3 mb-2 bg-gray-200 rounded flex justify-between"
            >
              <span>
                <b>{t.title}</b> — {t.priority}
              </span>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No tasks found
          </p>
        )}
      </ul>
    </div>
  );
}

import { useState, useEffect } from "react";
import API from "../api";


export default function TaskManager() {

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low"
  });

  const [list, setList] = useState([]);

  // ADD TASK
  const addTask = async () => {
    try {
      await API.post("/task/add", task);
      setTask({ title: "", description: "", priority: "Low" });
      loadTasks();
    } catch (error) {
      alert("Error adding task");
    }
  };

  // LOAD TASKS
  const loadTasks = async () => {
    try {
      const res = await API.get("/task/list");
      setList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Task Manager
      </h2>

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
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded mb-6"
        onClick={addTask}
      >
        Add Task
      </button>

      {list.length === 0 ? (
        <p className="text-center text-gray-500">
          No tasks found
        </p>
      ) : (
        <ul>
          {list.map((t) => (
            <li
              key={t._id}
              className="p-3 mb-2 bg-gray-200 rounded"
            >
              <b>{t.title}</b> — {t.priority}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

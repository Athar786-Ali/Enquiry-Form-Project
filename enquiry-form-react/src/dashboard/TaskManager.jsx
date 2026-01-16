import { useState, useEffect } from "react";
import axios from "axios";
import API from "../api";

export default function TaskManager() {
  const [task, setTask] = useState({
    title: "", description: "", priority: "Low"
  });

  const [list, setList] = useState([]);

  const addTask = () => {
    axios.post(`${API}/task/add`, task).then(() => loadTasks());
  };

  const loadTasks = () => {
    axios.get(`${API}/task/list`)
      .then(res => setList(res.data.data));
  };

  useEffect(() => { loadTasks(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>

      <input className="w-full p-2 border rounded mb-2"
        placeholder="Title"
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <textarea className="w-full p-2 border rounded mb-2"
        placeholder="Description"
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <select className="p-2 border rounded mb-2"
        onChange={(e) => setTask({ ...task, priority: e.target.value })}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="w-full bg-blue-600 text-white py-2 rounded mb-4"
        onClick={addTask}>
        Add Task
      </button>

      <ul>
        {list.map(t => (
          <li key={t._id} className="p-3 mb-2 bg-gray-200 rounded">
            {t.title} — {t.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { HiPlus, HiTrash, HiCheckCircle, HiCalendar, HiCollection } from "react-icons/hi";

export default function TaskManager() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState({ title: "", description: "", priority: "Low", dueDate: "" });

  const loadTasks = async () => {
    try {
      const res = await API.get("/task/list");
      setList(res.data.data || []);
    } catch (e) { 
      console.error(e);
      toast.error("Failed to connect to database"); 
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if(!task.title) return toast.warning("Title is required");
    try {
      await API.post("/task/add", task);
      setTask({ title: "", description: "", priority: "Low", dueDate: "" });
      loadTasks();
      toast.success("Task added successfully!");
    } catch (err) { toast.error("Error adding task"); }
  };

  const toggleTask = async (item) => {
    const newStatus = item.status === "pending" ? "completed" : "pending";
    await API.put(`/task/update/${item._id}`, { status: newStatus });
    loadTasks();
  };

  const deleteTask = async (id) => {
    if(window.confirm("Are you sure you want to delete this task?")) {
      await API.delete(`/task/delete/${id}`);
      loadTasks();
      toast.info("Task deleted");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto  min-h-screen">

      {/* Task Stats Card */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
         <div className="bg-white rounded-2xl shadow-xl flex-1 p-6 text-center border-b-4 border-indigo-500">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Tasks</p>
            <h3 className="text-3xl font-black text-slate-800">{list.filter(t => t.status !== 'completed').length}</h3>
         </div>
         <div className="bg-white rounded-2xl shadow-xl flex-1 p-6 text-center border-b-4 border-green-500">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Completed Tasks</p>
            <h3 className="text-3xl font-black text-slate-800">{list.filter(t => t.status === 'completed').length}</h3>
         </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border-t-4 border-indigo-500">
        <h2 className="text-2xl font-black mb-8 text-slate-800 flex items-center gap-2">
          <HiCollection className="text-indigo-600"/> Create New Task
        </h2>
        
        <form onSubmit={addTask} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Task Title</label>
              <input 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Enter task title..." 
                value={task.title} 
                onChange={e=>setTask({...task, title:e.target.value})} 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Due Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                value={task.dueDate} 
                onChange={e=>setTask({...task, dueDate:e.target.value})} 
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Description</label>
            <textarea 
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none" 
              placeholder="Add task details here..." 
              value={task.description} 
              onChange={e=>setTask({...task, description:e.target.value})} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Priority Level</label>
              <select 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                value={task.priority} 
                onChange={e=>setTask({...task, priority:e.target.value})}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <HiPlus className="text-xl"/> Add Task
            </button>
          </div>
        </form>
      </div>

      {/* Task List Section */}
      <div className="space-y-4">
        {list.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
            <p className="text-slate-400 font-medium italic">No tasks found. Start by adding one above!</p>
          </div>
        ) : (
          list.map(t => (
            <div 
              key={t._id} 
              className={`bg-white rounded-2xl shadow-xl p-5 flex items-center justify-between transition-all hover:shadow-2xl ${t.status === 'completed' ? 'bg-slate-50 opacity-60' : ''}`}
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleTask(t)} 
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${t.status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 hover:border-indigo-400'}`}
                >
                  {t.status === 'completed' && <HiCheckCircle className="text-xl"/>}
                </button>
                <div>
                  <h4 className={`font-bold text-lg ${t.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>{t.title}</h4>
                  <div className="flex gap-4 mt-1">
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <HiCalendar/> {t.dueDate ? t.dueDate.split('T')[0] : 'No deadline'}
                    </p>
                    <span className={`text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-md ${t.priority === 'High' ? 'bg-red-100 text-red-600' : t.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                      {t.priority}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteTask(t._id)} 
                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <HiTrash className="text-xl"/>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
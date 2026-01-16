import { useState, useEffect } from "react";
import API from "../api";
import { Button, Label, TextInput, Textarea, Select, Badge, Card, Table, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { HiOutlineExclamationCircle, HiCheckCircle, HiClock, HiTrash, HiPencil } from "react-icons/hi";

export default function TaskManager() {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: ""
  });

  // 1. LOAD TASKS & STATS
  const loadTasks = async () => {
    try {
      const res = await API.get("/task/list");
      setList(res.data.data);
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => { loadTasks(); }, []);

  // 2. SAVE OR UPDATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/task/update/${editingId}`, task);
        toast.success("Task updated successfully");
      } else {
        await API.post("/task/add", task);
        toast.success("Task added successfully");
      }
      setTask({ title: "", description: "", priority: "Low", dueDate: "" });
      setEditingId(null);
      setIsModalOpen(false);
      loadTasks();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  // 3. DELETE TASK
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/task/delete/${id}`);
      toast.info("Task deleted");
      loadTasks();
    }
  };

  // 4. TOGGLE STATUS (Complete/Pending)
  const toggleStatus = async (item) => {
    const newStatus = item.status === "pending" ? "completed" : "pending";
    await API.put(`/task/update/${item._id}`, { status: newStatus });
    loadTasks();
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setTask({
      title: item.title,
      description: item.description,
      priority: item.priority,
      dueDate: item.dueDate ? item.dueDate.split('T')[0] : ""
    });
    setIsModalOpen(true);
  };

  // CALCULATE STATS
  const completedCount = list.filter(t => t.status === "completed").length;
  const pendingCount = list.length - completedCount;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER & STATS */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">Task Center</h1>
          <Button onClick={() => { setEditingId(null); setTask({title:"", description:"", priority:"Low", dueDate:""}); setIsModalOpen(true); }} className="bg-blue-700">
            + New Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <h5 className="text-gray-500 font-medium">Total Tasks</h5>
              <span className="text-2xl font-bold">{list.length}</span>
            </div>
          </Card>
          <Card className="bg-white border-l-4 border-yellow-400">
            <div className="flex items-center justify-between">
              <h5 className="text-gray-500 font-medium">Pending</h5>
              <span className="text-2xl font-bold text-yellow-600">{pendingCount}</span>
            </div>
          </Card>
          <Card className="bg-white border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <h5 className="text-gray-500 font-medium">Completed</h5>
              <span className="text-2xl font-bold text-green-600">{completedCount}</span>
            </div>
          </Card>
        </div>

        {/* TASK TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <Table hoverable>
            <Table.Head className="bg-gray-100">
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Task Details</Table.HeadCell>
              <Table.HeadCell>Priority</Table.HeadCell>
              <Table.HeadCell>Due Date</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {list.map((t) => (
                <Table.Row key={t._id} className={t.status === 'completed' ? 'bg-gray-50 opacity-70' : ''}>
                  <Table.Cell>
                    <button onClick={() => toggleStatus(t)}>
                      {t.status === 'completed' ? 
                        <HiCheckCircle className="text-2xl text-green-500" /> : 
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                      }
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <div className={`font-bold text-gray-800 ${t.status === 'completed' ? 'line-through' : ''}`}>{t.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{t.description}</div>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={t.priority === 'High' ? 'failure' : t.priority === 'Medium' ? 'warning' : 'info'}>
                      {t.priority}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <HiClock /> {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'No date'}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <HiPencil className="text-lg text-blue-600 cursor-pointer" onClick={() => handleEdit(t)} />
                      <HiTrash className="text-lg text-red-500 cursor-pointer" onClick={() => deleteTask(t._id)} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {list.length === 0 && <div className="p-10 text-center text-gray-500 font-medium">No tasks found. Create one to get started!</div>}
        </div>

        {/* CREATE/EDIT MODAL */}
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Header>{editingId ? "Edit Task" : "Create New Task"}</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" value="Task Title" />
                <TextInput id="title" value={task.title} onChange={(e) => setTask({...task, title: e.target.value})} required />
              </div>
              <div>
                <Label htmlFor="desc" value="Description" />
                <Textarea id="desc" rows={3} value={task.description} onChange={(e) => setTask({...task, description: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label value="Priority" />
                  <Select value={task.priority} onChange={(e) => setTask({...task, priority: e.target.value})}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Select>
                </div>
                <div>
                  <Label value="Due Date" />
                  <TextInput type="date" value={task.dueDate} onChange={(e) => setTask({...task, dueDate: e.target.value})} />
                </div>
              </div>
              <Button type="submit" className="w-full mt-4 bg-blue-700">
                {editingId ? "Update Task" : "Save Task"}
              </Button>
            </form>
          </Modal.Body>
        </Modal>

      </div>
    </div>
  );
}

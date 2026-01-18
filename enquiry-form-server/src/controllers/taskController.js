const Task = require("../models/taskModel");

exports.addTask = async (req, res) => {
 const { title, description, priority, dueDate } = req.body;

const task = new Task({
  userId: req.user.id,
  title,
  description,
  priority,
  dueDate: dueDate || null
});

  await task.save();
  res.json({ status: 1, msg: "Task added", task });
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json({ status: 1, data: tasks });
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ status: 1, msg: "Task deleted" });
};

exports.updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ status: 1, msg: "Task updated", updated });
};

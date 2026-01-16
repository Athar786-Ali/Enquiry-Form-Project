const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    status: { type: String, enum: ['pending', 'completed'], default: "pending" },
    dueDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
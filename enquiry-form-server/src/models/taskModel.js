const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    priority: String,
    status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);

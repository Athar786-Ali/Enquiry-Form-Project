const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addTask,
  getTasks,
  deleteTask,
  updateTask
} = require("../controllers/taskController");

router.post("/add", auth, addTask);
router.get("/list", auth, getTasks);
router.delete("/delete/:id", auth, deleteTask);
router.put("/update/:id", auth, updateTask);

module.exports = router;

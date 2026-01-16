const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dbConnect = require('./src/dbConnection');

// ✅ Existing enquiry routes
const studentRoutes = require('./src/routes/studentRoutes');

// ✅ NEW routes (Login + Task Manager)
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();

// ==================
// Middleware
// ==================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-vercel-url.vercel.app"
  ],
  credentials: true
}));

// allow frontend requests
app.use(express.json());      // parse JSON body

// ==================
// Database Connection
// ==================
dbConnect();

// ==================
// Routes
// ==================

// 🔹 OLD (already live) — DO NOT TOUCH
app.use('/api/enquiry', studentRoutes);

// 🔹 NEW (Option A)
app.use('/api/user', userRoutes);   // login / register
app.use('/api/task', taskRoutes);   // task manager (JWT protected)

// ==================
// Server Start
// ==================
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});



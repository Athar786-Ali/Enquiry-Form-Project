const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./src/dbConnection');
const studentRoutes = require('./src/routes/studentRoutes');

const app = express();

// Middleware
app.use(cors()); // Frontend se connect karne ke liye bohot zaroori hai
app.use(express.json()); // JSON data samajhne ke liye

// Database Connection
dbConnect();

// Routes
app.use('/api/enquiry', studentRoutes);

// Server Start
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
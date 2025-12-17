const express = require('express');
const router = express.Router();
const { saveEnquiry, getEnquiries, deleteEnquiry, updateEnquiry } = require('../controllers/studentController');

// Routes definitions
router.post('/insert', saveEnquiry);      // Save karne ke liye
router.get('/view', getEnquiries);        // List dekhne ke liye
router.delete('/delete/:id', deleteEnquiry); // Delete karne ke liye
router.put('/update/:id', updateEnquiry);    // Edit karne ke liye

module.exports = router;


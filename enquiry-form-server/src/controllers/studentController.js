const studentModel = require('../models/studentModel');

// 1. Save Enquiry (Create)
const saveEnquiry = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        const newEnquiry = new studentModel({ name, email, phone, message });
        await newEnquiry.save();

        res.status(201).json({ status: 1, msg: "Enquiry Saved Successfully", data: newEnquiry });
    } catch (error) {
        res.status(500).json({ status: 0, msg: "Error saving enquiry", error: error.message });
    }
};

// 2. Get All Enquiries (Read)
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await studentModel.find();
        res.status(200).json({ status: 1, msg: "Data Found", data: enquiries });
    } catch (error) {
        res.status(500).json({ status: 0, msg: "Error fetching data", error: error.message });
    }
};

// 3. Delete Enquiry
const deleteEnquiry = async (req, res) => {
    try {
        const enquiryId = req.params.id;
        await studentModel.findByIdAndDelete(enquiryId);
        res.status(200).json({ status: 1, msg: "Enquiry Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ status: 0, msg: "Error deleting data", error: error.message });
    }
};

// 4. Update Enquiry
const updateEnquiry = async (req, res) => {
    try {
        const enquiryId = req.params.id;
        const { name, email, phone, message } = req.body;

        const updatedEnquiry = await studentModel.findByIdAndUpdate(
            enquiryId, 
            { name, email, phone, message },
            { new: true } // Return the updated document
        );

        res.status(200).json({ status: 1, msg: "Enquiry Updated Successfully", data: updatedEnquiry });
    } catch (error) {
        res.status(500).json({ status: 0, msg: "Error updating data", error: error.message });
    }
};

module.exports = { saveEnquiry, getEnquiries, deleteEnquiry, updateEnquiry };


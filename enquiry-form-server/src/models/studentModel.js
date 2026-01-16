const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true }); // timestamps: true se created_at apne aap aa jayega

const studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel;


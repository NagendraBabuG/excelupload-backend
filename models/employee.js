const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  resumeTitle: {
    type: String,
    required: true
  },
  currentLocation: {
    type: String
  },
  PostalAddress: {
    type: String
  },
  currentEmployeer: {
    type: String
  },
  currentDesignation: {
    type: String
  }
}, { timestamps: true });
employeeSchema.index({ email: 1 }, { unique: true });
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

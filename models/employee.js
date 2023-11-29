const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  'Name of the Candidate': {
    type: String,
    required: true
  },
  'Email': {
    type: String,
    unique: true,
    required: true
  },
  'Mobile No.': {
    type: String,
    required: true
  },
  'Date of Birth': {
    type: String,
    required: true
  },
  'Work Experience': {
    type: String,
    required: true
  },
  'Resume Title': {
    type: String,
    required: true
  },
  'Current Location': {
    type: String,
    required : true
  },
  'Postal Address': {
    type: String,
    required : true
  },
  'Current Employer': {
    type: String
  },
  'Current Designation': {
    type: String
  }
}, { timestamps: true })



const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee

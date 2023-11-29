const mongoose = require('mongoose')
const async = require('async')
const multer = require('multer')
const xlsx = require('xlsx')

const Employee = require('../models/employee')

const callback = (error) =>{
    if(error) console.log(`Error occured in async EachSeries ${error}`)
    else console.log('Employee Details Successfully Entered...')
}

const Function = async (data)=>{
    try{
        const isAlreadyPresent = await Employee.findOne({Email: data.Email})
        if(!isAlreadyPresent)
        {
            const newEmployee = new Employee(data)
            await newEmployee.save() 
        }
    }
    catch(error)
    {
        throw error
    }
}

const uploadExcelFile = async (req, res) => {

        try{
            // Bad Request
            if(!req.file) return res.status(400).json({mesage : 'Please Upload File Before Submitting...'})
            const workbook = xlsx.readFile(req.file.path)
            const sheetName = workbook.SheetNames[0];
            const workSheet = workbook.Sheets[sheetName];

            const JsonData = xlsx.utils.sheet_to_json(workSheet, { raw: true })
            await async.eachSeries(JsonData, Function, callback)

            return res.status(200).json({mesage : 'File Sucessfully Uploaded.'})

        }
        catch(error)
        {
            //Internal Error
            console.log('error in upload excel file')
            return res.status(500).json({message : 'Uploading File Failed.'})
        }
}



module.exports = uploadExcelFile
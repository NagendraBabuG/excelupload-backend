const express = require('express')
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose')
const xlsx = require('xlsx')
const Employee = require('./models/employee')
const async = require('async')
const employee = require('./models/employee')
const app = express()
app.use(cors())
require('dotenv').config()
const CONNECTION_URL = process.env.CONNECTION_URL 
const upload = multer({dest : 'uploads/'})

const PORT = process.env.PORT || 3000

app.post('/upload', upload.single('file'), (req, res)=> {
    const workbook = xlsx.readFile(req.file.path)
    let result = []
    let ind = 0
    for(let sheet in workbook.Sheets)
    {
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet])
        result = result.concat(jsonData)
    }
    async.eachSeries(result, async (item, callback = ()=>{})=>{
        try{
            const employeeCreated = new employee({
                'name' : item['Name of the Candidate'],
                'email' : item['Email'],
                'mobile' : item['Mobile No.'],
                'dob' : item['Date of Birth'],
                'experience' : item['Work Experience'],
                'resumeTitle' : item['Resume Title'],
                'currentLocation' : item['Current Location'],
                'PostalAddress' : item['Postal Address'] !== undefined ? item['Postal Address'] : '',
                'currentEmployeer' : item['Current Employer'] !== undefined ? item['Current Employer'] : '',
                'currentDesignation': item['Current Designation'] !== undefined ? item['Current Designation'] : '',
            })
           await employeeCreated.save()
            
            console.log(ind)
            ind += 1;    
        callback()
        }
        catch(error)
        {
            console.log(error)
            if(error.code === 11000)
            {
                console.log('duplicate key error')
            }
            else{
                console.log(error)
                throw new Error('Some other error occurred')
            }
        }
    }, 
    (error)=> {
        if(error) {
            console.log('error, ', error)
            //console.log('msg ',error.message)
            return res.status(404).json({status : 'error', data : error})
        }
        else{
            console.log('Added Employye to Database')
            return res.status(200).json({status : 'success', data : 'Data Added'})
        }
        //console.log(result.length , ' length')
    })
   // res.send(result)
})


mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on Port : ${PORT}`)
    })
}).catch((error) => console.log(error.message))

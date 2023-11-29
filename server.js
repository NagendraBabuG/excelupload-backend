const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connectdb')
const router = require('./routes/employee')

const app = express()
app.use(cors())
app.use('/', router)

require('dotenv').config()
const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`)
})


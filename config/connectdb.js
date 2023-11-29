const mongoose = require('mongoose')

const dotenv = require('dotenv')

require('dotenv').config()

mongoose.set('strictQuery', true)


const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Database Connected...`)
    }
    catch(error)
    {
        console.log(`error, ${error.message}`)
    }
}


module.exports = connectDB
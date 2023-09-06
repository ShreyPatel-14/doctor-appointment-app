const express=require('express')
const morgan=require('morgan')
const dotenv=require("dotenv")
const connectDB=require('./config/db')
const app=express()
//port
const port= process.env.PORT || 5000
//config dotenv
dotenv.config()
// MongoDb
connectDB()

app.use(express.json())
app.use(morgan('dev'))



app.use('/api/v1/user',require('./routing/userrouting'))
//listening port
app.listen(port,()=>
{
    console.log(`Server running ${process.env.NODE_MODE} on ${process.env.PORT}`)
})
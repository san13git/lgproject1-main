const express = require('express');
const cors=require('cors')
const mongoose = require('mongoose');
const connectDB=require('./db/connect')
const userRoutes = require('./routes/userRoutes')
const searchLog=require('./routes/searchLog')
const schedule = require('node-schedule');
const { identifyFrequentSearchesAndSendEmails } = require('./controllers/searchLogController');
// const { sendDiscountEmail } = require('./emailService');


// const { mongoURI } = require('./utils/constants');

require('dotenv').config()

const app = express();

app.use(cors('*'));
app.use(express.json());

// Middleware


// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/searches',searchLog);



schedule.scheduleJob('0 9 * * *', identifyFrequentSearchesAndSendEmails);

const port=process.env.PORT || 5000;


const start=async()=>{
    try{
       
        await connectDB(process.env.mongoURI)
        
        
        app.listen(port,console.log(`Server listening on port ${port} ...`))
    }catch(error){
        console.log(error)
    }

}

start();
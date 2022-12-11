require('dotenv').config();
const express= require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler')
connectDB();
const app=express();

//middlerware
app.use(express.json())
// tis allow ur to get json data whih is synnc with req body

//routes
app.use('/api/v1/bootcamps' , require('./routes/bootcampRoutes'))

//error handlers should place in last 
app.use(errorHandler); 
const PORT=process.env.PORT;
app.listen(PORT ,()=>{console.log(`Running on ${PORT}`);});

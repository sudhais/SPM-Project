const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
dotenv.config({path:path.join(__dirname , 'configs/config.env')});
const connectdb = require('./configs/db');
const cors = require('cors');

const app = express();

//details router 
const details = require('./routes/details')

//connect mongodb
connectdb();

//middle ware
app.use(cors());
app.use(express.json())

app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})


//routes
app.use("/api", details);

//error url middleware
app.use('*', (req,res,next)=>{
  res.status(404).json({message:'page not found'})
})


//listen for request
app.listen(process.env.PORT,()=>{
  console.log('server listening to the port : ' + process.env.PORT + " in " + process.env.NODE_ENV);
})
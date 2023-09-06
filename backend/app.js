const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
dotenv.config({path:path.join(__dirname , 'configs/config.env')});

const app = express();

//middle ware
app.use(express.json())

app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})


//routes


//error url middleware
app.use('*', (req,res,next)=>{
  res.status(404).json({message:'page not found'})
})


//listen for request
app.listen(process.env.PORT,()=>{
  console.log('server listening to the port : ' + process.env.PORT + " in " + process.env.NODE_ENV);
})
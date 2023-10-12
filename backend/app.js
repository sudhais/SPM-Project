const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const color = require('colors');
dotenv.config({path:path.join(__dirname , 'configs/config.env')});
const connectdb = require('./configs/db');
const cors = require('cors');
const connect = require('./utils/database.connection');

const app = express();

//details router 
const details = require('./routes/details')

//user router


//connect mongodb
// connectdb();
connect();

//middle ware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})


//routes
app.use("/api", details);
app.use('/api/v1/users', require('./routes/userRoute'));
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

//error url middleware
app.use('*', (req,res,next)=>{
  res.status(404).json({message:'page not found'})
})


//listen for request
app.listen(process.env.PORT,()=>{
  console.log('server listening to the port : ' + process.env.PORT + " in " + process.env.NODE_ENV);
})
import { join } from 'path';
import { config } from 'dotenv';
import morgan from 'morgan';
import express, { json } from 'express';
import color from 'colors';
config({path:join('C:\\Users\\DELL\\Desktop\\assignment\\spm\\project\\SPM-Project\\backend', 'configs/config.env')});
import cors from 'cors';
import connect from './utils/database.connection.js';

const app = express();

//details router 
import details from './routes/details.js';
import codeAnalyzer from './routes/codeAnalyzer.js';
import user from './routes/userRoute.js';
import transection from './routes/transectionRoutes.js';

connect();

//middle ware
app.use(morgan('dev'));
app.use(cors());
app.use(json())

app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})


//routes
app.use("/api", details);
// app.use('/api/v1/users', import('./routes/userRoute.js').default);
app.use('/api/v1/users', user);
// app.use("/api/v1/transections", require("./routes/transectionRoutes.js").default);
app.use("/api/v1/transections", transection);
app.use('/analyze-code', codeAnalyzer);

//error url middleware
app.use('*', (req,res,next)=>{
  res.status(404).json({message:'page not found'})
})


//listen for request
app.listen(process.env.PORT,()=>{
  console.log('server listening to the port : ' + process.env.PORT + " in " + process.env.NODE_ENV);
})
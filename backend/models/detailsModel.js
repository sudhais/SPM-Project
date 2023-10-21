import { Schema, model } from 'mongoose';

const detailsSchema = new Schema({
  userID: {
    type : String,
    required : [true, "Please enter user ID"],
    trim: true,
    maxLength : [20,"user ID cannot exceed 20 characters"]
  },
  projName: String,
  reports: [{
    class: String,
    method: String,
    lineNo:Number,
    statement:String,
    size: Number,
    nested:Number,
    inheritence:Number,
    control:Number,
    total:Number,
    multiply:Number
    
  }],
  value:{
    type: Number,
    required : [true, "Please enter ICB value"],
    trim: true
  },
  graphData:{
    userInput:Number,
    singleLine: Number,
    multiLine: Number,
    codeLine: Number,
    classes: Number,
    methods: Number,
    whileLoops: Number,
    forLoops: Number,
    ifElseCount: Number
  },
  date:String
  

  // reports:[
  //   [{
  //     lineNo:Number,
  //     statement:String,
  //     size: Number,
  //     control:Number,
  //     inheritence:Number,
  //     nested:Number,
  //     total:Number,
  //     multiply:Number
      
  //   }]
  // ]
}, {timeStamp: true});

let schema = model('detail', detailsSchema);

export default schema;
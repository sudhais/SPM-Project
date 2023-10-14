import { Schema, model } from 'mongoose';

const detailsSchema = new Schema({
  userID: {
    type : String,
    required : [true, "Please enter user ID"],
    trim: true,
    maxLength : [20,"user ID cannot exceed 20 characters"]
  },
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
  }

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
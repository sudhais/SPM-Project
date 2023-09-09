const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  userID: {
    type : String,
    required : [true, "Please enter user ID"],
    trim: true,
    maxLength : [20,"user ID cannot exceed 20 characters"]
  },
  reports: [{
    lineNo:Number,
    statement:String,
    size: Number,
    control:Number,
    inheritence:Number,
    nested:Number,
    total:Number,
    multiply:Number
    
  }]

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

let schema = mongoose.model('detail', detailsSchema);

module.exports = schema;
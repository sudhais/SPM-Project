const { default: mongoose } = require('mongoose');

const conndb = ()=>{
  mongoose.connect(process.env.MONG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology : true
  }).then((con)=>{
      console.log("Mongo db conncected to the host " + con.connection.host);
  }).catch((err)=>{
      console.log(err);
  })
}

module.exports = conndb;
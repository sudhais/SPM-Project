import { Schema, model } from 'mongoose';

//schema design
const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'name is required'],
    },
    email:{
        type:String,
        required:[true, 'email is required and should be unique'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
},
{timestamps:true}
);

//export
const userModel = model('users',userSchema);
export default userModel;
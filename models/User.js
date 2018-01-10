const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId:String ,
  credits:{ type:Number,default:0 }
});

//tell mongo collection to be create
mongoose.model('users',userSchema);
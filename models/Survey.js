const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveyShema = new Schema({

  title:String,
  body:String,
  subject:String,
  recipients:[RecipientSchema],
  yes:{type:Number,default:0},
  no:{ type:Number,default:0},
  _user:{ type: Schema.Types.ObjectId,ref:'User'},//own by a specific user
  dateSent:Date,
  lastResponded:Date

});

mongoose.model('surveys',surveyShema);
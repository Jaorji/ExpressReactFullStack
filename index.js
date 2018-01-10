const express = require('express');//import express library=import express from 'express'
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport');

const key = require('./config/keys');

//const authRoutes = require('./routes/authRoutes');
mongoose.connect(key.mongoURL);
const app = express();//may have many express application

//baody parser
app.use(bodyParser.json());
//cookie 
app.use(
  cookieSession({
    //how long time cookie exist
    maxAge:30*24*60*60*1000,//30 days
    keys:[key.cookieKey]
  })
);
//tell passport to user cookie for our auth
app.use(passport.initialize());
app.use(passport.session());

// app.get('/',(req,res)=>{
//   res.send({hi:'xiaocongji'});
// });//route handler get

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
  //Express will serve up production assests
  //like out main.js file.or main.css file
  //if specific file match the route

  app.use(express.static('client/build'));

  //Express will serve up devlopment assests
  //if it doesn't recognize the rotue
  const path=require('path');
  app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });

}
const PORT = process.env.PORT || 5000;//Dynamic Port Binding

app.listen(PORT);


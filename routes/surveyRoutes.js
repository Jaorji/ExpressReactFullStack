const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/EmailTemplate/surveyTemplate');
const Survey = mongoose.model('surveys');
const _ = require('lodash');
const Path = require('path-parser');
const {URL} =require('url');//default url library

module.exports = app =>{
  app.get('/api/surveys',requireLogin,async (req,res)=>{
   const surveys= await Survey.find({
      _user:req.user.id
    }).select({
      recipients:false
    });
   res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice',(req,res)=>{
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys',requireLogin,async (req,res)=>{
    const {title,subject,body,recipients} = req.body;
    //create instance of survey
    const survey = new Survey({
      title,
      subject,
      body,
      recipients:recipients.split(',').map(email=> ({email:email.trim()}) ),
      _user:req.user.id,
      dateSent:Date.now()
    });

    //Great place to send email
  //if we have a class we need instance then we use 'new'
  const mailer = new Mailer(survey,surveyTemplate(survey));
  try{
    await mailer.send();
    await survey.save();
  } catch (err){
    res.status(422).send(err);
  }
   
   });

   app.post('/api/surveys/webhooks',(req,res)=>{
     const p = new Path('/api/surveys/:surveyId/:choice');

     const events = _.chain(req.body)
      .map(req.body,({email,url})=>{
       
       const match = p.test(new URL(url).pathname);
       if(match){
         return {email,serverId:match.surveyId,choice:match.choice};
       }
     })
      //go through all the events and remove the undefined one
      .compact()
      .uniqBy('email','surveyId')
      //run every sign event in our query
      .each(({surveyId,email,choice})=>{
        Survey.updateOne({
          _id:surveyId,
          recipients:{
            $eleMatch:{email,responded:false}
          }
        },{
          $inc:{[choice]:1},
          $set:{ [recipients.$.responded]:true},
          lastResponded:new Date()

        }).exec();
      })
      .value();
      
     res.send({});
   });
};
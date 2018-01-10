const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//take the user and user.id is the mongoose id 
//OAth id is allow some one to sign in otherwise we use userid
//call serializeUser to generate the identifying piece of info
passport.serializeUser((user,done)=>{
    done(null,user.id);  
});

passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then(user=>{
        done(null,user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret:keys.googleClientSecert,
    callbackURL:'/auth/google/callback',//relative path
    proxy:true
}, async (accessToken,refreshToken,profile,done)=>{//done tell passport we finished
    //to see if we have this record,return a promise
    const existingUser = await User.findOne({googleId:profile.id})
      
        if(existingUser){
            //have a record.do not create one
            //call done function to tell passport we are done,null means no error
            done(null,existingUser);
        }else{
            //make a new record
          const user  = await new User({googleId:profile.id}).save()
          done(null,user);
          //make sure user create sccessfully
        }
    }   
  )
);

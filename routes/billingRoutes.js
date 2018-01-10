const keys=require("../config/keys");
const stripe = require('stripe')(keys.stripeSecretkey);
const requireLogin = require('../middlewares/requireLogin');

module.exports= app => {
  //ask express to test requireLogin
  //we can pass as many middlewares as we want
  app.post('/api/stripe',requireLogin, async (req,res)=>{
    //need body parser here
    const charge = await stripe.charges.create({
      amount:500,
      currency:'usd',
      description:'class credits',
      source:req.body.id
    });
    console.log(charge);

    //respond the request
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
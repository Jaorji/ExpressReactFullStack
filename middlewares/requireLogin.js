//next is function we need to call to see if all the process is end
module.exports = (req,res,next)=>{
  if(!req.user){
    return res.status(401).send({error:'You must log in!'});
  }
  next();

}
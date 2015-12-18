var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

//adding the connection
var connection=mongoose.createConnection('mongodb://localhost/ts16DB');

//define the schema
//define the model
//add data into the model
var eventSchema=require('../models/eventSchema');
//for the userSchema
var userSchema=require('../models/userSchema');
var eventSchema=mongoose.model('eventSchema',eventSchema);
var userSchema=mongoose.model('userSchema',userSchema);

router.post('/postEvent',function(req,res){
  var eventDetails = new eventSchema({
  //get all values
  nameOfEvent:req.body.nameOfEvent,
  description:req.body.description,
  rules:req.body.rules,
  dateOfEvent:req.body.dateOfEvent,
  timeOfEvent:req.body.timeOfEvent,
  venue:req.body.venue,
  coordinator_1:req.body.coordinator_1,                                                //name of first coordinator
  coordinator_2:req.body.coordinator_2,                                                     //name of second coordinator
  phoneno_1:req.body.phoneno_1,
  phoneno_2:req.body.phoneno_2,
  categoryId:req.body.categoryId,
  reference_url:req.body.reference_url,                                                               //for the reference
  userId:req.body.userId
});
eventDetails.save(function(err,data){
  if(err){
    console.log('error occured'+error);
  }
  else{
    console.log('event details saved'+data);
  }
});
res.end("saved");
});


router.get('/',function(req,res){
  res.render('event');
});

router.get('/postEvent',function(req,res){
res.render('event');
});

/*
router.get('/eventQuery',function(req,res){
eventSchema.find({}).exec(function(err,result){
if(!err){
  res.write(JSON.stringify(result));
}
else{
  console.log('error in your query');
}
});
});

//for the query on the user model
router.get('/userQuery',function(req,res){
var query=userSchema.find({'email':'abhishekg785@gmail.com','password':'123'});
query.exec(function(err,result){
if(!err){
  res.end(JSON.stringify(result, undefined, 2));
}
else{
  res.end("not found");
}
});
});
*/

module.exports=router;

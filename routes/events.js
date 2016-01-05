var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

//adding the connection
//var connection=mongoose.createConnection('mongodb://localhost/ts16DB');

//define the schema
//define the model
//add data into the model
var eventSchema=require('../models/eventSchema');
//for the userSchema
var userSchema=require('../models/userSchema');
var eventSchema=mongoose.model('eventSchema',eventSchema);
var userSchema=mongoose.model('userSchema',userSchema);

//API TO LIST ALL EVENT(GET)
router.get('/',function(req,res){
  //res.render('event');
  var query=eventSchema.find({});
  query.exec(function(err,data){
   if(!err){
    if(data){
    console.log(data);
    res.send(data);
    //res.send(JSON.stringify(data));
   }
   else{
    res.send('No events yet');
   }
 }
   else{
    console.log(err);
   }
  });
});

router.get('/postEvent',function(req,res){
 if(req.session && req.session.userName){              //post event only if user has logged in
 res.render('event');
 }
 else{
   res.redirect('../login');
 }
});

//API FOR POSTING AN EVENT(POST)
router.post('/postEvent',function(req,res){
  console.log(req.body.nameOfEvent);
  console.log('in post event');
  var eventDetails = new eventSchema(
  {
  //get all values
  nameOfEvent:req.body.nameOfEvent,
  description:req.body.description,
  rules:req.body.rules,
  dateOfEvent:req.body.dateOfEvent,
  timeOfEvent:req.body.timeOfEvent,
  venue:req.body.venue,
  coordinator_1:req.body.coordinator_1,                                         //name of first coordinator
  coordinator_2:req.body.coordinator_2,                                         //name of second coordinator
  phoneno_1:req.body.phoneno_1,
  phoneno_2:req.body.phoneno_2,
  categoryId:req.body.categoryId,
  reference_url:req.body.reference_url,                                         //for the reference
  userId:req.session.userId

}
);
eventDetails.save(function(err,data){
  if(err){
    console.log('error occured'+err);
    res.send('The event has been registered already');                      //if duplicay in the event name occurs
  }
  else{
    console.log('event details saved'+data);
    res.send("details has been saved:"+data);
  }
});
});

//API FOR SEARCHING A PARTICULAR EVENT BY NAME OF EVENT(GET)
router.get('/:eventName',function(req,res){
 //console.log(req.params.eventName);
 var query=eventSchema.findOne({'nameOfEvent':req.params.eventName});
 query.exec(function(err,result){
  if(!err){
    if(result){
    res.send(result);
  }
  else{
    res.send('no such event registered');
  }
  }
  else{
    console.log('error');
  }
 });
});

//API FOR DELETING THE PARTICULAR EVENT(DELETE)
router.get('/deleteEvent/:eventName',function(req,res){
  //first check whether the event exists
  //and if event found then delete the event
  //otherwise find the event
  //later the middleware will be created to avoid the code repetition
  var query=eventSchema.findOne({'nameOfEvent':req.params.eventName});   //later this code will be removed to make a middleware as its has been used earlier
  query.exec(function(err,event){
    if(!err){
      if(event){  //event found
        console.log('event found'+event);
        var deleteQuery=eventSchema.remove({'nameOfEvent':req.params.eventName});
        deleteQuery.exec(function(err){
          if(!err){
            res.send('deleted');
          }
          else{
            res.send('error ocurred'+err);
          }
        });
      }
      else{
        res.send('no such event found');
      }
    }
    else{
      console.log(err);
      res.send('error ocurred'+err);
    }
  });
});

//API FOR THE UPDATING THE EVENT DETAILS(PUT)
router.put('/updateEvent/:eventName',function(req,res){
  var query=eventSchema.findOne({'nameOfEvent':req.params.eventName});
  query.exec(function(err,result){            //result contains the details of the event found
    if(!err){
      if(result){
        // console.log('event found'+result);
        // console.log('eventId:'+result._id);
        // console.log('req.body'+req.body);
      eventSchema.findByIdAndUpdate(result._id,req.body,function(err){
        if(!err){
          res.send("data updated");
        }
        else{
          console.log('error'+err);
          res.send('error'+err);
        }
      });
    }
    else{
      console.log('no such event found to update');
      res.send('No such update');
    }
    }
    else{
      console.log('error occured'+err);
      res.send('error occured'+err);
    }
  });
});


module.exports=router;

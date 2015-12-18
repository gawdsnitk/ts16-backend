var express=require('express');
var router=express.Router();

//here comes the database part//
var mongoose=require('mongoose');
var autoIncrement=require('mongoose-auto-increment');


var Connection=mongoose.createConnection('mongodb://localhost/testDb');
autoIncrement.initialize(Connection);
  /*if(err){
    console.log('error:'+err);
  }
  else {
    console.log('connected');
  }
});
*/
//console.log(Connection);

var userSchema=require('../models/userSchema');
userSchema.plugin(autoIncrement.plugin,{model:'userSchema',field:'id'});
var userSchema=mongoose.model('userSchema',userSchema);//model
router.post('/',function(req,res){
  var name=req.body.name;
  var email=req.body.email;
  var password=req.body.password;
  var person=new userSchema({
  name:name,
  email:email,
  password:password
});
person.save(function(err,data){
  if(err){
    console.log('error:'+err);
  }
  else {
    console.log('data saved:'+data);
  }
});
res.send("saved");
});

router.get('/',function(req,res){
res.redirect('/');
});

module.exports=router;

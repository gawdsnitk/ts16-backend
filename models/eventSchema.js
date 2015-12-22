var mongoose=require('mongoose');
var eventSchema=new mongoose.Schema({
 nameOfEvent:String,
 description:String,
 rules:String,
 dateOfEvent:Date,
 timeOfEvent:String,
 venue:String,
 coordinator_1:String,                                                           //name of first coordinator
 coordinator_2:String,                                                           //name of second coordinator
 phoneno_1:String,
 phoneno_2:String,
 categoryId:Number,
 reference_url:String,                                                           //for the reference
 userId:Number
 });

 module.exports = eventSchema;                                                   //define the model

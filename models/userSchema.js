var mongoose=require('mongoose');
//var autoIncrement=require('mongoose-auto-increment');
var userSchema=new mongoose.Schema({
  id:Number,
  userName:String,
  email:String,
  password:String
});
//creating the model for our schema//
module.exports = userSchema;
//module.exports=mongoose.model('userSchema',userSchema);

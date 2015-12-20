var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    email:String,
    password:String
});

/*userSchema.methods.checkPassword = function(password){
    return(hash(password) === this.password);
};*/
module.exports=userSchema;
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost/nodetest1');
var userSchema = require('../models/loginCheck');

//GET users listing. 
var userSchema = mongoose.model('userSchema',userSchema);

/*router.post('/loginValidate', function(req, res, next){
    console.log(req.body);
    var sentemail = req.body.email;
    var sentpassword = req.body.password;
    userSchema.findOne({ email : sentemail},function(err,user){
        if(err)
        {
            console.log("no match");
        }
        if(user)
        {
            userSchema.findOne({password : sentpassword},function(err,passwordMatch){
            if(err) 
            {
                throw err;
            }
            else{
                if(passwordMatch)
                {
                    console.log('Password:',passwordMatch);
                    //res.send('congrats! you are a registered user');
                    //res.redirect('../'); --redirect also working;
                    res.render('index');
                }
                else res.send('you entered incorrect password');
            }
        });
        }
        else 
        {
            console.log('no match found');
            res.send('you entered invaid emailId');
        }
    });
});
*/
module.exports=router;

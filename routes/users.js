var express = require('express');
var session = require('express-session');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ts16DB');
var userSchema = require('../models/userSchema');

/* GET users listing. */
var userSchema = mongoose.model('userSchema',userSchema);
var sess = {}; //will be used for session variables

router.post('/register', function(req, res, next) {
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var admin = new userSchema({
        userName: name,
        email: email,
        password:password
        
    });
    console.log('values retrieved');
    admin.save(function(err,data){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(admin.userName + "inserted");
        }
    });
    res.send("done");
});

router.post('/loginValidate', function(req, res, next){
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
            console.log(user.password);
            var userpass=user.password;
            console.log('userId is'+ userid);
            userSchema.findOne({password : sentpassword},function(err,passwordMatch){
            if(err) 
            {
                throw err;
            }
            else{
                if(passwordMatch)
                {
                   var pass=passwordMatch.password; 
                   console.log('Password:',passwordMatch.password);
                }
                if(userpass==pass)
                {
                    sess = req.session;
                    sess.userEmail = sentemail;
                    console.log(sess);
                    res.redirect('../sessionName');
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

module.exports = router;

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ts16DB');
var userSchema = require('../models/loginCheck');

/* GET users listing. */
var userSchema = mongoose.model('userSchema',userSchema);

router.post('/register', function(req, res, next) {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    var admin = new userSchema({
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
            console.log(admin.email + "inserted");
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
            userSchema.findOne({password : sentpassword},function(err,passwordMatch){
            if(err) 
            {
                throw err;
            }
            else{
                if(passwordMatch)
                {
                    console.log('Password:',passwordMatch);
                    res.redirect('../');
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

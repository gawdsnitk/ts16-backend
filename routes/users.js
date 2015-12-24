var express = require('express');
var session = require('express-session');
var router = express.Router();
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection=mongoose.createConnection('mongodb://localhost/ts16DB');
var userSchema = require('../models/userSchema');

//autoIncrement for creating the object id to be autoincrementing
autoIncrement.initialize(connection);
console.log('auto increment added to app.js');
userSchema.plugin(autoIncrement.plugin,'userSchema');

/* GET users listing. */
var userSchema = mongoose.model('userSchema',userSchema);
var sess = {}; //will be used for session variables

router.post('/register', function(req, res, next) {
    console.log(req.body);
    var name = req.body.name;
    var userName = req.body.userName;
    var password = req.body.password;
    var admin = new userSchema({
       name:name,
       userName:userName,
       password:password
    });
    console.log('values retrieved');
    admin.save(function(err,data){
        if(err)
        {
            console.log(err);
            res.send('the user with the username:'+userName+' already exists');
        }
        else
        {
            console.log(admin.userName + "inserted");
            res.send('registered');
        }
    });
});

router.post('/loginValidate', function(req, res, next){
    console.log(req.body);
    var sentUsername = req.body.userName;
    var sentpassword = req.body.password;
    userSchema.findOne({ userName : sentUsername},function(err,user){
        if(err)
        {
            console.log("no match");
        }
        if(user)
        {
            console.log(user.password);
            var userpass=user.password;
            //console.log('userId is'+ userid);
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
                    sess.userName = sentUsername;
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

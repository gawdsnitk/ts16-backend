var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res){
   res.render('login'); 
});
router.get('/registerAdmin',function(req,res){
    res.render('register');
});
router.get('/sessionName',function(req,res){
    var email=req.session.userEmail;
    if(email)
    {
        res.send('Hello'+' '+email);
    }
    else
    {
        res.render('login');
    }
});
module.exports = router;

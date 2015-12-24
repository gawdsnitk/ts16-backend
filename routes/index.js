var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res){
   res.render('login');
});
router.get('/registerAdmin',function(req,res){
    res.render('register');
});

router.get('/sessionName',function(req,res){   //demo for session
    var userName=req.session.userName;
    if(userName)
    {
        res.send('Hello'+' '+userName);
    }
    else
    {
        res.render('login');
    }
});
module.exports = router;

var express = require('express');
var router = express.Router();

var User = require("../model/user");

router.get('/', function (req,res) {
    res.render('signup');
});

router.use('/', function(req, res){
    User.createNewUser(req.body['user'], req.body['pass'], function (err) {
        if (err) {
            console.error(err);
            res.render('signup', {message: "User already exists"});
        }
        else {
            console.log("User saved");
            res.redirect('login', {message: "User Created Successfully"});
        }
    });
});



module.exports = router;

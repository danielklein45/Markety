/*************************************************************************
 File name: signup.js
 *************************************************************************/

var express = require('express');
var router = express.Router();
var User = require("../model/user");

router.get('/', function (req,res) {
    console.log("(route/signup.js) Started get()");
    res.render('signup');
});

router.use('/', function(req, res){
    console.log("(route/signup.js) Started use()");
    User.createNewUser(req.body['user'], req.body['pass'], function (err) {
        if (err) {
            console.log(err);
            res.render('signup', {message: "User already exists"});
        }
        else {
            res.render('signup', {message: "User created successfully!"});
        }
    });
});

module.exports = router;

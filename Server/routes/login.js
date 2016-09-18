/*************************************************************************
 File name: login.js
 *************************************************************************/

// Access to collections and express
var express = require('express');
var router = express.Router();
var User = require("../model/user");

// Display the login page
router.get('/', function(req, res) {
    console.log("(route/login.js) Started get()");
    res.render('login');
});

// Handle sign in
router.use('/', function(req, res){
    console.log("(route/login.js) Started use()");
    User.authenticate(req.body['user'], req.body['pass'], function (err) {
        if (err){
            res.render('login', {message: "Bad Username or Password"})
        }
        else {
            req.session.user = req.body['user'];
            res.redirect('home');
        }
    });
});

module.exports = router;

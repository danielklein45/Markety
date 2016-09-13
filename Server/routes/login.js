var express = require('express');
var router = express.Router();



var User = require("../model/user");

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('login');
});

router.use('/', function(req, res, http){
    User.authenticate(req.body['user'], req.body['pass'], function (err) {
        if (err){
            res.send("Bad Username or Password")
        }
        else {
            req.session.user = req.body['user'];
            res.redirect('home');
        }
    });
});

module.exports = router;

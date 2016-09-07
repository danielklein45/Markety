var express = require('express');
var router = express.Router();

var User = require("../model/user");

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('login');
});

router.use('/', function(req, res){
    User.authenticate(req.body['user'], req.body['pass'], function (err) {
        if (err){
            res.send("Bad Username or Password")
        }
        else {
            res.send("OK")
        }
    });
});

module.exports = router;

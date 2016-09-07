var express = require('express');
var router = express.Router();

var User = require("../model/user");

router.get('/', function (req,res) {
    res.render('signup');
});

router.use('/', function(req, res){
    var newUser = new User({Username: req.body['user'], Password: req.body['pass']});

    newUser.save(function (err) {
    if (err) {
        return err;
    }
    else {
        console.log("User saved");
    }
});

});



module.exports = router;
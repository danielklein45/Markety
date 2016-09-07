var express = require('express');
var router = express.Router();

var UM = require('DB/Users');

router.get('/', function (req,res) {
    res.render('signup');
});

router.use('/', function(req, res){
    UM.addNewAccount(req.body['Username'], req.body['Password']);
});



module.exports = router;
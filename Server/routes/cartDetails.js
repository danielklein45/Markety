var express = require('express');
var router = express.Router();

//var cartDetails = require('../model/cartDetails');

router.get('/', function(req, res) {
    console.log(req.query['id']);
    res.send(req.query['id']);
});

module.exports = router;
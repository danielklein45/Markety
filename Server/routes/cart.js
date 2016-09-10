var express = require('express');
var router = express.Router();

var cart = require('../model/cart');

router.get('/', function(req, res) {
    cart.getCartsByUsername("Daniel", function(err, docs){
        console.log(docs);
        //res.json(docs);
        res.render('cart', {id: docs});//, res.json(docs))
    })
});

module.exports = router;
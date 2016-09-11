var express = require('express');
var router = express.Router();

var cart = require('../model/cart');

router.get('/', function(req, res) {
    cart.getCartsByUsername("Daniel", function(err, docs){
        if(err){
            res.send(err);
        }
        else if(docs.length){
            for(var i=0; i<docs.length; i++){
                console.log(docs[i].ProductID);
            }

            res.render('cart', {cartsList : docs});
        }
        else {
            res.render('No carts found');
        }
    })
});

router.use('/', function(req, res) {
    res.redirect('cartDetails/?id=' + req.body[name]);
});

module.exports = router;
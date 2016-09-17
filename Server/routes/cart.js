var express = require('express');
var router = express.Router();
var user = require('../model/user');

router.get('/', function(req, res) {
    //console.log("test")
    user.getAllCartsByUsername(req.session.user, function(err, docs){
        if(err){
            console.log(err);
        }
        else if(docs.length){
            console.log(docs);

            res.render('cart', {cartsList : docs});
        }
        else {
            res.render('cart', {cartsList : docs, message: "No carts found"});
        }
    })
});

router.use('/', function(req, res) {
    res.redirect('cartDetails/?id=' + req.body[name]);
});

module.exports = router;
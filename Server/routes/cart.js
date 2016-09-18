/*************************************************************************
 File name: cart.js
 Manages all cart page actions
 *************************************************************************/

// Access to collections and express
var express = require('express');
var router = express.Router();
var user = require('../model/user');

// Displays the user's carts
router.get('/', function(req, res) {
    console.log("(route/cart.js) Started get()");
    user.getAllCartsByUsername(req.session.user, function(err, docs){
        if(err){
            console.log(err);
        }
        else if(docs.length){
            res.render('cart', {cartsList : docs});
        }
        else {
            res.render('cart', {cartsList : docs, message: "No carts found"});
        }
    })
});


// router.use('/', function(req, res) {
//     res.redirect('cartDetails/?id=' + req.body[name]);
// });

module.exports = router;
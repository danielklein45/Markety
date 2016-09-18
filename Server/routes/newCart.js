/*************************************************************************
 File name: newCart.js
 *************************************************************************/

var express = require('express');
var router = express.Router();
var user = require("../model/user");
var store = require("../model/store");

router.get('/', function(req, res) {
    console.log("(route/newCart.js) Started get()");
    store.getStores(function (err, docs) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('newCart', {storesList: docs});
        }
    })
});

router.use('/', function(req, res){
    console.log("(route/newCart.js) Started use()");
    user.addNewCart(req.session.user, req.body['store'], req.body['cartName'], function(err, cartId) {
        if (err){
            console.log(err)
        }
        else {
            res.redirect('cartDetails/?id=' + cartId);
        }
    })
});

module.exports = router;
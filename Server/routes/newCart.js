var express = require('express');
var router = express.Router();

var user = require("../model/user");
var store = require("../model/store");

router.get('/', function(req, res) {
    store.getStores(function (err, docs) {
        if (err) {
            res.send(err);
        }
        else if (docs.length) {
            res.render('newCart', {storesList: docs});
        }
    })
});

router.use('/', function(req, res){
    user.addNewCart(req.session.user, req.body['store'], req.body['cartName'], function(err, cartId) {
        if (err){
            console.log(err)
        }
        else {
            console.log('yesssssssssssssss came back :) cartId: ' +cartId);
            res.redirect('cartDetails/?id=' + cartId);
        }
    })
});

module.exports = router;
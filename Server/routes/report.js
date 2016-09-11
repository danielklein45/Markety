var express = require('express');
var router = express.Router();

var report = require("../model/report");
var store = require("../model/store");


router.get('/', function(req, res) {
    store.getStores(function (err, docs) {
        if (err) {
            res.send(err);
        }
        else if (docs.length) {
            for (var i = 0; i < docs.length; i++) {
                console.log(docs[i].Name);
            }

            res.render('report', {storesList: docs});
        }
    })
});

module.exports = router;
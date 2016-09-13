var express = require('express');
var router = express.Router();

var store = require("../model/store");


router.get('/', function(req, res) {
    store.getStores(function (err, docs) {
        if (err) {
            res.send(err);
        }
        else if (docs.length) {
            res.render('report', {storesList: docs});
        }
    })
});

router.use('/', function(req, res){
    store.addNewReport(req.session.user, req.body['dropdown'], req.body['problem'], function(err) {
        if (err){
            console.log(err)
        }
        else{
            store.getStores(function (err, docs) {
                if (err) {
                    res.send(err);
                }
                else if (docs.length) {
                    res.render('report', {storesList: docs, message:"Thank you! The report has been submitted"});
                }
            })
        }

    })
});

module.exports = router;
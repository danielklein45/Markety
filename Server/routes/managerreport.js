var express = require('express');
var router = express.Router();

var store = require('../model/store');

router.get('/', function(req, res) {
    store.getReportsManagerReport(req.session.user, function(err, reports){
        if (err){
            console.log(err)
        }
        else{
            res.render('managerreport', {reports: reports});
        }
    })
});

module.exports = router;
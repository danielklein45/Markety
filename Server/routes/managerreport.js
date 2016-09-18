/*************************************************************************
 File name: managerreport.js
 *************************************************************************/

var express = require('express');
var router = express.Router();
var store = require('../model/store');

router.get('/', function(req, res) {
    console.log("(route/managerreport.js) Started get()");
    store.getReportsManagerReport(req.session.user, function(err, reports){
        if (err){
            console.log(err)
        }
        else{
            if(reports){
                res.render('managerreport', {reports: reports});
            }
            else{
                res.render('managerreport', {reports: reports, message: "You are not a manager"});
            }
        }
    })
});

module.exports = router;
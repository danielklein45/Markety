/*************************************************************************
 File name: home.js
 *************************************************************************/

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log("(route/home.js) Started get()");
    if (req.session){
        res.render('home', {username: req.session.user});
    }
    else {
        res.send("No existing session")
    }
});

module.exports = router;
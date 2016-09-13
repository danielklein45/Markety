var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    if (req.session){
        res.render('home', {username: req.session.user});
    }
    else {
        res.send("No existing session")
    }
});

module.exports = router;
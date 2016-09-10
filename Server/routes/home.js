var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('home', {username: req.query.username});
});

module.exports = router;
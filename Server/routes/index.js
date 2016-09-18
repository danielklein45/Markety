/*************************************************************************
 File name: index.js
 *************************************************************************/

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log("(route/index.js) Started get()");
  res.render('index', { title: 'Markety' });
});

module.exports = router;

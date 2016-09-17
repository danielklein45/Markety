var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');

// ROUTES
var routes = require('./routes/index');
var login = require('./routes/login');
var signup = require('./routes/signup');
var home = require('./routes/home');
var cart = require('./routes/cart');
var cartDetails = require('./routes/cartDetails');
var report = require('./routes/report');
var managerreport = require('./routes/managerreport');
var newCart = require('./routes/newCart');

// APP SETTINGS
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

//
app.use(router);
app.use('/', routes);
app.use('/login', login);
app.use('/signup', signup);
app.use('/home', home);
app.use('/cart', cart);
app.use('/cartDetails', cartDetails);
app.use('/report', report);
app.use('/reports', managerreport);
app.use('/newCart', newCart);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

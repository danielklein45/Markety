var mongoose = require("mongoose");

//connect to database
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');

//create schema for blog post
var user = new mongoose.Schema({
    Username:  String,
    Password: String
});

//compile schema to model
module.exports = db.model('user', user)
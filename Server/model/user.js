var mongoose = require("mongoose");

//connect to database
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');

//create schema for blog post
var user = new mongoose.Schema({
    Username:  {type: String, unique: true},
    Password: {type: String}
});

//compile schema to model
module.exports = db.model('user', user);
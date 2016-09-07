var mongoose = require("mongoose");

//connect to database
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');

var user = mongoose.model('user', {
    Username:  {type: String, unique: true},
    Password: {type: String}
});


function createNewUser(newuser, newpassword, callable){
    var newUser = new user({Username: newuser, Password: newpassword});

    newUser.save(function (err) {
        callable.call(this, err);
    });
}

module.exports.createNewUser = createNewUser;
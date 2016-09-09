var mongoose = require("mongoose");

//connect to database
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');

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

function authenticate(userToCheck, password, callable) {
    user.find({Username: userToCheck, Password: password}, function (err, docs) {
        if (docs.length===1){
            callable.call(this)
        }
        else {
            callable(this, "Not Found")
        }
    });
}

module.exports.createNewUser = createNewUser;
module.exports.authenticate = authenticate;
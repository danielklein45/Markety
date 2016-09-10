var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var user = mongoose.model('user', {
    Username:  {type: String, unique: true},
    Password: {type: String}
});


function createNewUser(newuser, newpassword, callable){
    var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');
    var newUser = new user({Username: newuser, Password: newpassword});

    newUser.save(function (err) {
        mongoose.connection.close();
        callable.call(this, err);
    });
}

function authenticate(userToCheck, password, callable) {
    var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');
    user.find({Username: userToCheck, Password: password}, function (err, docs) {
        if (docs.length===1){
            mongoose.connection.close();
            callable.call(this);
        }
        else {
            mongoose.connection.close();
            callable(this, "Not Found")

        }
    });
}

function populateUsers(callable) {
    var user1 = new user({
        Username: "Daniel",
        Password: 123456
    });
    user1.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("user1 saved");
            callable.call();
        }
    });
}

module.exports.populateUsers = populateUsers;
module.exports.createNewUser = createNewUser;
module.exports.authenticate = authenticate;
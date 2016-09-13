var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var user = mongoose.model('user', {
    Username:  {type: String, unique: true},
    Password: {type: String},
    StoresManager: []
});


function createNewUser(newuser, newpassword, callable){
    var newUser = new user({Username: newuser, Password: newpassword, StoresManager: []});

    newUser.save(function (err) {
        callable.call(this, err);
    });
}

function authenticate(userToCheck, password, callable) {
    user.find({Username: userToCheck, Password: password}, function (err, docs) {
        if (docs.length===1){
            callable.call(this);
        }
        else {
            callable(this, "Not Found")

        }
    });
}

function populateUsers(callable) {
    var user1 = new user({
        Username: "Daniel",
        Password: '123456',
        StoresManager: [1]
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
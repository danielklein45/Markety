var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//connect to database
mongoose.Promise = global.Promise;

var cart = Schema({
    StoreID: {type: Number},
    CartName: {type: String},
    ProductID: {type: [Number]},
    UpdateDateTime: {type: Date}
});

var user = mongoose.model('user', {
    Username:  {type: String, unique: true},
    Password: {type: String},
    Carts: {type: [cart]},
    StoresManager: []
});

function createNewUser(newuser, newpassword, callable){
    var newUser = new user({
        Username: newuser,
        Password: newpassword,
        Carts: [],
        StoresManager: []});
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
        Carts: [{
            StoreID: 1,
            CartName: "Weekend Cart",
            ProductID: [1,2,3,4],
            UpdateDateTime: Date.now()
        },{
            StoreID: 1,
            CartName: "Party Cart",
            ProductID: [5],
            UpdateDateTime: Date.now()
        }],
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

function getStoresManagerByUsername(username, callable){
    user.findOne({Username: username}, "StoresManager", function(err, docs){
        if (err){
            console.log(err)
        }
        else{
            callable(null, docs)
        }
    })
}

function getAllCartsByUsername(username, callable) {
    console.log("started getAllCartsByUsername() for Username: " + username);
    user.findOne({Username: username}, "Carts", function(err, docs){
        if (err){
            console.log(err)
        }
        else{
            console.log("found: " + docs.Carts);
            callable(null, docs.Carts);
        }
    })

}

function getCartDetailsByCartId(cartId, callable) {
    console.log("(1) started getCartDetailsByCartId() for cartId: " + cartId);
    user.findOne({'Carts._id': cartId}, function(err, docs){
        if (err){
            console.log(err)
        }
        else{
            var carts = docs.Carts;
            for(var i=0; i<carts.length; i++){
                if (carts[i]._id == cartId)
                {
                    var cartResult = carts[i];
                    break;
                }
            }
            callable(null, cartResult);

            // var carts = docs.Carts;
            // console.log("(2) " + carts);
            // var result = carts.filter(function(obj) {
            //     return obj._id == cartId;
            // });
            // console.log("(3) " + result);
            // console.log("(4) " + docs);
            // callable(null, result);
        }
    })
}

function deleteProductFromCart(userId, cartId, productId, callable) {
    console.log("deleteProductFromCart: PROD " + productId + " CART: " + cartId);
    user.findOne({'Carts._id': cartId}, function(err, docs){
        if (err){
            console.log(err)
        }
        else {
            var carts = docs.Carts;
            for (var i = 0; i < carts.length; i++) {
                if (carts[i]._id == cartId) {
                    console.log("FOUND IN LOOP CART TO DEL::::::::   " + cartId);
                    carts[i].ProductID.pull(productId);
                    console.log("PRODS AFTER::::::::   " + carts[i].ProductID);
                    break;
                }
            }
            docs.save( function (err) {
                if(err) {
                    console.error('ERROR!');
                }
            });
        }
        callable(null);
    });
}

function addNewCart(userName, storeId, cartName, callable) {
    console.log("addNewCart");
    user.update({Username: userName}, {$push: {"Carts": {
        StoreID: storeId,
        CartName: cartName,
        ProductID: [],
        UpdateDateTime: Date.now()}}},
        function (err) {
            if (err) {
                console.log(err);
            }
        });
    console.log('find the new one');
    user.findOne({'Carts.CartName': cartName}, function(err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            var carts = docs.Carts;
            for (var i = 0; i < carts.length; i++) {
                if (carts[i].CartName == cartName) {
                    var cartResult = carts[i];
                    break;
                }
            }
            console.log("about to go back after breaking the loop");
            callable(null, cartResult._id);
        }
    })
}

function addProductToCart(userName, productId, cartId, callable) {
    console.log("addProductToCart: PROD " + productId + " CART: " + cartId);
    user.findOne({'Carts._id': cartId}, function(err, docs){
        if (err){
            console.log(err)
        }
        else {
            var carts = docs.Carts;
            for (var i = 0; i < carts.length; i++) {
                if (carts[i]._id == cartId) {
                    console.log("FOUND IN LOOP CART TO EDIT::::::::   " + cartId);
                    carts[i].ProductID.push(productId);
                    console.log("PRODS AFTER::::::::   " + carts[i].ProductID);
                    break;
                }
            }
            docs.save( function (err) {
                if(err) {
                    console.error('ERROR!');
                }
            });
        }
        callable(null);
    });
}

module.exports.addProductToCart = addProductToCart;
module.exports.addNewCart = addNewCart;
module.exports.deleteProductFromCart = deleteProductFromCart;
module.exports.getCartDetailsByCartId = getCartDetailsByCartId;
module.exports.getAllCartsByUsername = getAllCartsByUsername;
module.exports.populateUsers = populateUsers;
module.exports.createNewUser = createNewUser;
module.exports.authenticate = authenticate;
module.exports.getStoresManagerByUsername = getStoresManagerByUsername;
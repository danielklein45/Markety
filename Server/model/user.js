/*************************************************************************
 File name: user.js
 Manages all DB access to the user collection
 *************************************************************************/

// Access to Mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Cart schema
var cart = Schema({
    StoreID: {type: Number},
    CartName: {type: String},
    ProductID: {type: [Number]},
    UpdateDateTime: {type: Date},
    Total: {type: Number}
});

// User schema
var user = mongoose.model('user', {
    Username:  {type: String, unique: true, index: true},
    Password: {type: String},
    Carts: {type: [cart]},
    StoresManager: []
});

// Starting data
function populateUsers(callable) {
    var user1 = new user({
        Username: "Daniel",
        Password: '123456',
        Carts: [{
            StoreID: 1,
            CartName: "Weekend Cart",
            ProductID: [1,2,3,4],
            UpdateDateTime: Date.now(),
            Total: 80.9
        },{
            StoreID: 1,
            CartName: "Party Cart",
            ProductID: [5],
            UpdateDateTime: Date.now(),
            Total: 7.45
        }],
        StoresManager: [1]
    });
    user1.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("(model/user.js) user1 saved");
            callable.call();
        }
    });
}

// Input: New user's name and password
// Action: Adds the new user to the collection
function createNewUser(userName, password, callable){
    console.log("(model/user.js) Started createNewUser()");
    var newUser = new user({
        Username: userName,
        Password: password,
        Carts: [],
        StoresManager: []});
    newUser.save(function (err) {
        callable.call(this, err);
    });
}

// Input: User name & password
// Action: Checks there's a user with the given password
function authenticate(userToCheck, password, callable) {
    console.log("(model/user.js) Started authenticate()");
    user.find({Username: userToCheck, Password: password}, function (err, docs) {
        if (docs.length===1){
            callable.call(this);
        }
        else {
            callable(this, "Not Found")
        }
    });
}

// Input: User name
// Action: Returns the stores ID the given user is manager of
function getStoresManagerByUsername(userName, callable){
    console.log("(model/user.js) Started getStoresManagerByUsername()");
    user.findOne({Username: userName}, "StoresManager", function(err, docs){
        if (err){
            console.log(err)
        }
        else{
            callable(null, docs)
        }
    })
}

// Input: User name
// Action: Returns the user's carts
function getAllCartsByUsername(userName, callable) {
    console.log("(model/user.js) Started getAllCartsByUsername()");
    user.findOne({Username: userName}, "Carts", function(err, docs){
        if (err){
            console.log(err)
        }
        else{
            callable(null, docs.Carts);
        }
    })
}

// Input: Cart ID
// Action: Returns the cart's details
function getCartDetailsByCartId(cartId, callable) {
    console.log("(model/user.js) Started getCartDetailsByCartId()");
    user.findOne({'Carts._id': cartId}, function(err, docs){
        if (err){
            console.log(err)
        }
        else{
            var carts = docs.Carts;
            for(var i=0; i<carts.length; i++){
                if (carts[i]._id == cartId){
                    var cartResult = carts[i];
                    break;
                }
            }
            callable(null, cartResult);
        }
    })
}

// Input: Cart ID with the product's ID and price
// Action: Deletes the product from the cart
function deleteProductFromCart(productPrice, cartId, productId, callable) {
    console.log("(model/user.js) Started deleteProductFromCart()");
    user.findOne({'Carts._id': cartId}, function(err, docs){
        if (err){
            console.log(err)
        }
        else {
            var carts = docs.Carts;
            for (var i = 0; i < carts.length; i++) {
                if (carts[i]._id == cartId) {
                    user.update({'Carts._id': cartId}, { $inc: { 'Carts.$.Total': -1*productPrice} }, function(err){
                        if(err){
                            console.log(err);
                        }
                    });
                    carts[i].ProductID.pull(productId);
                    break;
                }
            }
            docs.save( function (err) {
                if(err) {
                    console.log(err);
                }
            });
        }
        callable(null);
    });
}

// Input: Cart name with user name and store ID
// Action: Create a new cart for the user for the given store
function addNewCart(userName, storeId, cartName, callable) {
    console.log("(model/user.js) Started addNewCart()");
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
            callable(null, cartResult._id);
        }
    })
}

// Input: Cart ID with the product's ID and price
// Action: Adds the product to the cart
function addProductToCart(productPrice, productId, cartId, callable) {
    console.log("(model/user.js) Started addProductToCart()");
    user.findOne({'Carts._id': cartId}, function(err, docs){
        if (err){
            console.log(err)
        }
        else {
            var carts = docs.Carts;
            for (var i = 0; i < carts.length; i++) {
                if (carts[i]._id == cartId) {
                    user.update({'Carts._id': cartId}, { $inc: { 'Carts.$.Total': productPrice} }, function(err){
                        console.log(err);
                    });
                    carts[i].ProductID.push(productId);
                    break;
                }
            }
            docs.save( function (err) {
                if(err) {
                    console.log(err);
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
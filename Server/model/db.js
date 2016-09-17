var product = require('./product');
var store = require('./store');
var user = require('./user');

var mongoose = require("mongoose");

function populateDB(callable) {
    console.log("Populate DB started");
    product.populateProducts(function() {
        console.log("Populate products finished");

    });

    store.populateStores(function() {
        console.log("Populate stores finished")

    });

    user.populateUsers(function() {
        console.log("Populate users finished")
        callable.call()

    });
}

populateDB(function () {
    console.log("Populate DB finished");
    process.exit(0)
});
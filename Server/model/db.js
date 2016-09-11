var product = require('./product');
var store = require('./store');
var user = require('./user');
var cart = require('./cart');
var report = require('./report');

var mongoose = require("mongoose");

function populateDB(callable) {
    product.populateProducts(function() {
        console.log("Populate products finished");

    });

    store.populateStores(function() {
        console.log("Populate stores finished")

    });

    user.populateUsers(function() {
        console.log("Populate users finished")

    });

    cart.populateCarts(function() {
        console.log("Populate carts finished")
    });

    report.populateReports(function() {
        console.log("Populate reports finished");
        callable.call();
    })


}

populateDB(function () {
    console.log("Populate DB Finished");
    process.exit(0)
});
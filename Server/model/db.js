/*************************************************************************
 File name: db.js
 Populates the DB with some data to start
 *************************************************************************/

// Access to the collections population files
var product = require('./product');
var store = require('./store');
var user = require('./user');

// Access to Mongoose
var mongoose = require("mongoose");

// Main population method
function populateDB(callable) {
    console.log("(model/db.js) Populate DB started");

    product.populateProducts(function() {
        console.log("(model/db.js) Populate products finished");
    });

    store.populateStores(function() {
        console.log("(model/db.js) Populate stores finished")
    });

    user.populateUsers(function() {
        console.log("(model/db.js) Populate users finished")
        callable.call()
    });
}

// Run file's method
populateDB(function () {
    console.log("(model/db.js) Populate DB finished");
    process.exit(0)
});
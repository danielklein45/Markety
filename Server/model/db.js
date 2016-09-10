var product = require('./product');
var store = require('./store');

var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');

function populateDB(callable) {
    product.populateProducts(function() {
        console.log("Populate products finished");
    });

    store.populateStores(function() {
       console.log("Populate stores finished")
    });

    callable.call();
}

populateDB(function () {
    console.log("Populate DB Finished");
    process.exit(0)
});
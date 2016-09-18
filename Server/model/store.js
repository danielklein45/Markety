/*************************************************************************
 File name: store.js
 Manages all DB access to the store collection
 *************************************************************************/

// Access to Mongoose & user schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var user = require('../model/user');

// Report schema
var report = Schema({
    UserID: {type: String},
    Description: {type: String}
});

// Store schema
var store = mongoose.model('store', {
    StoreID:  {type: Number, unique: true, index: true},
    Name: {type: String},
    Address: {type: String},
    Reports: [report]
});

// Starting data
function populateStores(callable) {
    var store1 = new store({
        StoreID: 1,
        Name: "Shufersal",
        Address: "Tel-Aviv",
        Reports: [
            {UserID: "Daniel", Description: "The Shampoo is in the wrong row"},
            {UserID: "Daniel", Description: "The price of the Bisly is 7.45"}
        ]
    });
    store1.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("(model/store.js) store1 saved");
        }
    });

    var store2 = new store({
        StoreID: 2,
        Name: "Mega",
        Address: "Givataim",
        Reports: []

    });
    store2.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("(model/store.js) store2 saved");
        }
    });

    var store3 = new store({
        StoreID: 3,
        Name: "Rami-Levi",
        Address: "Haifa",
        Reports: []
    });
    store3.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("(model/store.js) store3 saved");
            callable.call();
        }
    });
}

// Action: Returns all store docs
function getStores(callable){
    console.log("(model/store.js) Started getStores()");
    store.find({}, function(err, docs){
        callable(null, docs);
    })
}

// Input: User name, store ID, and description of the report
// Action: Saves the new report
function addNewReport(userName, storeId, description, callable) {
    console.log("(model/store.js) Started addNewReport()");
    store.update({_id: storeId}, {$push: {"Reports": {UserID: userName, Description: description}}}, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            callable.call(this, err);
        }
    });
}

// Input: User name
// Action: Checks if the user is a store manager, and if so returns all the store's reports
function getReportsManagerReport(userName, callable){
    console.log("(model/store.js) Started getReportsManagerReport()");
    user.getStoresManagerByUsername(userName, function(err, docs){
        if(docs.StoresManager.length > 0) {
            store.find({StoreID: {"$in": docs.StoresManager}}, "Reports", function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    callable(null, docs[0].Reports)
                }
            });
        }
        else{
            callable(null, null);
        }
    });
}

// Input: Store ID
// Action: Returns the given store name
function getStoreNameById(storeId, callable) {
    console.log("(model/store.js) Started getStoreNameById()");
    store.find({StoreID: storeId}, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            callable(null, docs);
        }
    });
}

module.exports.getStoreNameById = getStoreNameById;
module.exports.getReportsManagerReport = getReportsManagerReport;
module.exports.populateStores = populateStores;
module.exports.getStores = getStores;
module.exports.addNewReport = addNewReport;


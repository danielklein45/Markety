var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//iireport = require('../model/report');

var report = Schema({
    UserID: {type: String},
    Description: {type: String}
});

//connect to database
mongoose.Promise = global.Promise;

var store = mongoose.model('store', {
    StoreID:  {type: Number, unique: true},
    Name: {type: String},
    Address: {type: String},
    Reports: [report]
});

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
            console.log("store1 saved");
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
            console.log("store2 saved");
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
            console.log("store3 saved");
            callable.call();
        }
    });
}

function getStores(callable){
    store.find({}, function(err, docs){
        console.log(docs);
        //mongoose.connection.close();
        callable(null, docs);
    })
}

function addNewReport(newuser, storeid, description, callable) {
    console.log("addNewReport");
    store.update({_id: storeid}, {$push: {"Reports": {UserID: newuser, Description: description}}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            callable.call(this, err);
        }
    });
}

module.exports.populateStores = populateStores;
module.exports.getStores = getStores;
module.exports.addNewReport = addNewReport;

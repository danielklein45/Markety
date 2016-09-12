var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//iireport = require('../model/report');

var report = mongoose.model('report', {
    UserID: {type: String},
    Description: {type: String}
});

//connect to database
mongoose.Promise = global.Promise;

var store = mongoose.model('store', {
    StoreID:  {type: Number, unique: true},
    Name: {type: String},
    Address: {type: String},
    Reports: Array
});

function populateStores(callable) {
    var store1 = new store({
        StoreID: 1,
        Name: "Shufersal",
        Address: "Tel-Aviv",
        Reports: [
            {UserID: "Daniel", Description: "Bad Location"},
            {UserID: "Daniel", Description: "BadPrice"}
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
        Reports: [
            {UserID: "Roi", Description: "Bad Location"},
            {UserID: "Roi", Description: "BadPrice"}
        ]
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
        Reports: [
            {UserID: "Liat", Description: "Bad Location"},
            {UserID: "Liat", Description: "BadPrice"}
        ]

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
    //mongoose.connection.close();
    //var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');


    store.find({}, function(err, docs){
        console.log(docs);
        //mongoose.connection.close();
        callable(null, docs);
    })
}

function addNewReport(newuser, storeid, description, callable) {
    console.log("addNewReport");
    //var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');
    store.update({_id: storeid}, {$push: {"Reports": {UserID: newuser, Description: description}}}, function (err) {
        if (err) {
            console.log(err);
            //mongoose.connection.close();
        } else {
            //mongoose.connection.close();
            callable.call(this, err);
        }
    });
}

module.exports.populateStores = populateStores;
module.exports.getStores = getStores;
module.exports.addNewReport = addNewReport;

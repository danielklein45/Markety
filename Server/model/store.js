var mongoose = require("mongoose");

//connect to database
mongoose.Promise = global.Promise;

var store = mongoose.model('store', {
    StoreID:  {type: Number, unique: true},
    Name: {type: String},
    Address: {type: String}
});

function populateStores(callable) {
    var store1 = new store({
        StoreID: 1,
        Name: "Shufersal",
        Address: "Tel-Aviv"
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
        Address: "Givataim"
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
        Address: "Haifa"
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
    var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');

    store.find({}, function(err, docs){
        console.log(docs);
        mongoose.connection.close();
        callable(null, docs);
    })
}

module.exports.populateStores = populateStores;
module.exports.getStores = getStores;


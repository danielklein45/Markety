var mongoose = require("mongoose");

//connect to database
mongoose.Promise = global.Promise;
//

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
    store1.save();

    var store2 = new store({
        StoreID: 2,
        Name: "Mega",
        Address: "Givataim"
    });
    store2.save();

    var store3 = new store({
        StoreID: 3,
        Name: "Rami-Levi",
        Address: "Haifa"
    });
    store3.save();

    callable.call();
}

module.exports.populateStores = populateStores;


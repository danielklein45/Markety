var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var cart = mongoose.model('cart', {
    Username:  {type: String},
    StoreID: {type: Number},
    ProductID: {type: Number},
    UpdateDateTime: {type: Date}
});

function populateCarts(callable) {
    var cart1 = new cart({
        Username: "Daniel",
        StoreID: 1,
        ProductID: 1,
        UpdateDateTime: Date.now()
    });
    cart1.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("cart1 saved");
        }
    });
    var cart2 = new cart({
        Username: "Daniel",
        StoreID: 1,
        ProductID: 5,
        UpdateDateTime: Date.now()
    });
    cart2.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("cart2 saved");
            callable.call();
        }
    });
}

function getCartsByUsername(username, callable) {
    var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');

    cart.find({Username: username},'_id', function(err, docs){
        console.log(docs);
        mongoose.connection.close();
        callable(null, docs)
    })

}

module.exports.populateCarts = populateCarts;
module.exports.getCartsByUsername = getCartsByUsername;

var mongoose = require("mongoose");

//connect to database
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');

var product = mongoose.model('product', {
    ProductID:  {type: Number, unique: true},
    Name: {type: String},
    Description: {type: String},
    StoreID: {type: Number},
    Price: {type: Number},
    Position: {type: Number}
});

function populateProduct() {
    var product1 = new product({
        ProductID: 1,
        Name: "Shampoo",
        Description: "Head&Shoulders",
        StoreID: 1,
        Price: 22.45,
        Position: 3
    });
    product1.save();

    var product2 = new product({
        ProductID: 2,
        Name: "IceCream",
        Description: "Vanile",
        StoreID: 1,
        Price: 30,
        Position: 2
    });
    product2.save();
}

module.exports.populateProducts = populateProduct;
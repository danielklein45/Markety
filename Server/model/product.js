var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var product = mongoose.model('product', {
    ProductID:  {type: Number, unique: true},
    Name: {type: String},
    Description: {type: String},
    StoreID: {type: Number},
    Price: {type: Number},
    Position: {type: Number}
});

function populateProduct(callable) {
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

    var product3 = new product({
        ProductID: 3,
        Name: "Cheese",
        Description: "Osem",
        StoreID: 1,
        Price: 15,
        Position: 3
    });
    product3.save();

    var product4 = new product({
        ProductID: 4,
        Name: "Cream Cheese",
        Description: "Osem",
        StoreID: 1,
        Price: 13.45,
        Position: 2
    });
    product4.save();

    var product5 = new product({
        ProductID: 5,
        Name: "Bamba",
        Description: "Osem",
        StoreID: 1,
        Price: 7.45,
        Position: 5
    });
    product5.save();

    var product6 = new product({
        ProductID: 6,
        Name: "Bisli",
        Description: "Osem",
        StoreID: 1,
        Price: 3.25,
        Position: 5
    });
    product6.save();

    var product7 = new product({
        ProductID: 7,
        Name: "Chocolate",
        Description: "Osem",
        StoreID: 1,
        Price: 5.25,
        Position: 5
    });
    product7.save();

    callable.call();
}

module.exports.populateProducts = populateProduct;
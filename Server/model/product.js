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
    var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');
    var product1 = new product({
        ProductID: 1,
        Name: "Shampoo",
        Description: "Head&Shoulders",
        StoreID: 1,
        Price: 22.45,
        Position: 3
    });
    product1.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("product1 saved");
        }
    });

    var product2 = new product({
        ProductID: 2,
        Name: "IceCream",
        Description: "Vanile",
        StoreID: 1,
        Price: 30,
        Position: 2
    });
    product2.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("product2 saved");
        }
    });

    var product3 = new product({
        ProductID: 3,
        Name: "Cheese",
        Description: "Osem",
        StoreID: 1,
        Price: 15,
        Position: 3
    });
    product3.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("product3 saved");
        }
    });

    var product4 = new product({
        ProductID: 4,
        Name: "Cream Cheese",
        Description: "Osem",
        StoreID: 1,
        Price: 13.45,
        Position: 2
    });
    product4.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("product4 saved");
        }
    });

    var product5 = new product({
        ProductID: 5,
        Name: "Bamba",
        Description: "Osem",
        StoreID: 1,
        Price: 7.45,
        Position: 5
    });
    product5.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("product5 saved");
        }
    });

    var product6 = new product({
        ProductID: 6,
        Name: "Bisli",
        Description: "Osem",
        StoreID: 1,
        Price: 3.25,
        Position: 5
    });
    product6.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("product6 saved");
        }
    });
    var product7 = new product({
        ProductID: 7,
        Name: "Chocolate",
        Description: "Osem",
        StoreID: 1,
        Price: 5.25,
        Position: 5
    });
    product7.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("product7 saved");
            callable.call();
        }
    });
}
module.exports.populateProducts = populateProduct;
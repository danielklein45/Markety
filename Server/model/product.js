var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var product = mongoose.model('product', {
    ProductID: {type: Number, unique: true},
    Name: {type: String},
    Description: {type: String},
    StoreID: {type: [Number]},
    Price: {type: Number},
    Position: {type: String}
});

function populateProduct(callable) {
    var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');

    var product1 = new product({
        ProductID: 1,
        Name: "Shampoo",
        Description: "Head&Shoulders",
        StoreID: [1,3],
        Price: 22.45,
        Position: 'A1'
    });
    product1.save(function (err) {
        if (err) {console.log(err)}
        else {console.log("product1 saved");}});

    var product2 = new product({
        ProductID: 2,
        Name: "IceCream",
        Description: "Vanile",
        StoreID: [1,2,3],
        Price: 30,
        Position: 'B2'
    });
    product2.save(function (err) {
        if (err) {console.log(err)}
        else {console.log("product2 saved");}});

    var product3 = new product({
        ProductID: 3,
        Name: "Cheese",
        Description: "Tnuva",
        StoreID: [1,2,3],
        Price: 15,
        Position: 'C1'
    });
    product3.save(function (err) {
        if (err) {console.log(err)}
        else {console.log("product3 saved");}});

    var product4 = new product({
        ProductID: 4,
        Name: "Cream Cheese",
        Description: "Tara",
        StoreID: [1,2],
        Price: 13.45,
        Position: 'C2'
    });
    product4.save(function (err) {
        if (err) {console.log(err)}
        else {console.log("product4 saved");}});

    var product5 = new product({
        ProductID: 5,
        Name: "Bamba",
        Description: "Osem",
        StoreID: [1,2,3],
        Price: 7.45,
        Position: 'B5'
    });
    product5.save(function (err) {
        if (err) {console.log(err)}
        else {console.log("product5 saved");}});

    var product6 = new product({
        ProductID: 6,
        Name: "Bisli",
        Description: "Osem",
        StoreID: [1,2,3],
        Price: 3.25,
        Position: 'B6'
    });
    product6.save(function (err) {
        if (err) {console.log(err)}
        else {console.log("product6 saved");}});

    var product7 = new product({
        ProductID: 7,
        Name: "Chocolate",
        Description: "Elit",
        StoreID: [1,3],
        Price: 5.25,
        Position: 'B3'
    });
    product7.save(function (err) {
        if (err) {console.log(err)}
        else {console.log("product7 saved");}});
}

function getProductsDescriptionList(productIds, callable) {
    console.log("(1) started getProductsDescriptionList()");
    product.find({'ProductID': {$in: productIds}}).sort({Position: 1}).exec(function(err, docs){
        if (err){
            console.log(err)
        }
        else{
            console.log("FOUND:::::: " + docs);
            callable(null, docs);
        }
    })
}

function getProductsByStoreId(storeID, callable){
    console.log("(1) started getProductsByStoreId() with storeID: " + storeID);
    product.find({'StoreID': storeID}).sort({Name: 1}).exec(function(err, docs){
        if (err){
            console.log(err)
        }
        else{
            console.log("FOUND::PRODUCTS:::: " + docs);
            callable(null, docs);
        }
    })
}

module.exports.getProductsByStoreId =getProductsByStoreId;
module.exports.getProductsDescriptionList =getProductsDescriptionList;
module.exports.populateProducts = populateProduct;
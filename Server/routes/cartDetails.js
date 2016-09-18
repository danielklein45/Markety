/*************************************************************************
 File name: cartDetails.js
 Manages all cart details page actions
 *************************************************************************/

// Access to collections and express
var express = require('express');
var router = express.Router();
var user = require('../model/user');
var product = require('../model/product');
var store = require('../model/store');

// Display the given cart's details and delete/add products if asked to
router.get('/', function(req, res) {
    console.log("(route/cartDetails.js) Started get()");
    var cartId = (req.query['id']);
    var action = (req.query['action']);

    if(action == 'delete') {
        console.log("(route/cartDetails.js) Action: Delete product");
        product.getProductsDescriptionList(req.query['productId'], function (err, productArray) {
            user.deleteProductFromCart(productArray[0].Price, req.query['cartId'], req.query['productId'], function (err){
                if (err){
                    console.log(err)
                }
                else{
                    res.redirect('cartDetails/?id=' + req.query['cartId']);
                }
            })
        })
    }

    else if(action == 'add'){
        console.log("(route/cartDetails.js) Action: Add product");
        product.getProductsDescriptionList(req.query['addProduct'], function (err, productArray) {
            user.addProductToCart(productArray[0].Price, req.query['addProduct'], req.query['cartId'], function (err) {
                if (err) {
                    console.log(err)
                }
                else {
                    res.redirect('cartDetails/?id=' + req.query['cartId']);
                }
            })
        })
    }

    else{
        console.log("(route/cartDetails.js) Action: Show products");
        user.getCartDetailsByCartId(cartId, function (err, currentCart) {
            product.getProductsByStoreId(currentCart.StoreID, function(err, storeProducts){
                store.getStoreNameById(currentCart.StoreID, function(err, storeName){
                    if (currentCart.ProductID.length > 0) {
                        product.getProductsDescriptionList(currentCart.ProductID, function (err, productArray) {
                            res.render('cartDetails', {storeName: storeName, cart: currentCart, storeProducts: storeProducts, products: productArray});
                        })
                    }
                    else {
                        res.render('cartDetails', {storeName: storeName, cart: currentCart, storeProducts: storeProducts, products: currentCart.ProductID});
                    }
                })

            })
        })
    }
});

module.exports = router;
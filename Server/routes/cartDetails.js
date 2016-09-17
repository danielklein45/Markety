var express = require('express');
var router = express.Router();
var user = require('../model/user');
var product = require('../model/product');
var store = require('../model/store')

router.get('/', function(req, res) {
    console.log(req);
    var cartId = (req.query['id']);
    var action = (req.query['action']);

    if(typeof action == 'undefined' && typeof cartId !== 'undefined') {
        console.log('111111111111111111111111111111111111111');
        user.getCartDetailsByCartId(cartId, function (err, currentCart) {
            product.getProductsByStoreId(currentCart.StoreID, function(err, storeProducts){
                store.getStoreNameById(currentCart.StoreID, function(err, storeName){
                    if (currentCart.ProductID.length > 0) {
                        product.getProductsDescriptionList(currentCart.ProductID, function (err, productArray) {
                            console.log('((3)) store: ' + storeName);
                            res.render('cartDetails', {cart: currentCart, storeProducts: storeProducts, products: productArray, storeName: storeName});
                        })
                    }
                    else {
                        res.render('cartDetails', {cart: currentCart, storeProducts: storeProducts, products: currentCart.ProductID, storeName: storeName});
                    }
                })

            })
        })
    }

    else if(typeof action !== 'undefined' &&  action == 'delete') {
        console.log('2222222222222222222222222222222222222222');
        user.deleteProductFromCart((req.session.user), req.query['cartId'], req.query['productId'], function (err){
            if (err){
                console.log(err)
            }
            else{
                res.redirect('cartDetails/?id=' + req.query['cartId']);
            }
        })
    }
    else if(typeof action !== 'undefined' &&  action == 'add'){
        console.log('33333333333333333333333333333333333333333333');
        user.addProductToCart(req.session.user, req.query['addProduct'], req.query['cartId'], function(err) {
            if (err){
                console.log(err)
            }
            else{
                res.redirect('cartDetails/?id=' + req.query['cartId']);
            }
        })
    }
});

module.exports = router;
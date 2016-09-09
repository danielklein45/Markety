var product = require('./product');

function populateDB() {
    product.populateProducts();
}

populateDB();
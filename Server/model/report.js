var mongoose = require("mongoose");


mongoose.Promise = global.Promise;

var report = mongoose.model('report', {
    UserID: {type: String},
    StoreID: {type: Number},
    Description: {type: String}
});

function populateReports(callable) {
    var report1 = new report({
        UserID: "Daniel",
        StoreID: 1,
        Description: "The Shampoo should be on row 2"
    });
    report1.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("report1 saved");
        }
    });
    var report2 = new report({
        UserID: "Daniel",
        StoreID: 1,
        Description: "The Price of Shampoo is wrong"
    });
    report2.save(function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("report2 saved");
            callable.call();
        }
    });
}

module.exports.populateReports = populateReports;
var mongoose = require("mongoose");


mongoose.Promise = global.Promise;

var report = mongoose.model('report', {
    UserID: {type: String},
    Description: {type: String}
});

function populateReports(callable) {
    var report1 = new report({
        UserID: "Daniel",
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

function createNewReport(newuser, description, callable){
    //var db = mongoose.connect('mongodb://127.0.0.1:27017/Markety');
    var newReport = new report({UserID: newuser, Description: description});

    newReport.save(function (err) {
        console.log("saved new report");
        //mongoose.connection.close();
        callable.call(this, err, newReport);
    });
}

module.exports.populateReports = populateReports;
module.exports.createNewReport = createNewReport;
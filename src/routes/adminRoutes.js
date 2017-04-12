var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function(nav) {
    //If there are some predefined arrays of books
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryapp';
            mongodb.connect(url,
                function(err, db) {
                    var collection = db.collection('books');
                    collection.insertMany(books,
                        function(err, result) {
                            res.send(result);
                            db.close();
                        });
                });
        });

    return adminRouter;
};

module.exports = router;

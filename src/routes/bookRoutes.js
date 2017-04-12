//The route is technically a controller in MVC
var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
//To pass a function in the require - i.e the nav
var router = function(nav) {

    //When using the router of express
    bookRouter.route('/')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryapp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.find({})
                    .toArray(function(err, results) {
                        res.render('bookList', {
                            title: 'Books',
                            nav: nav,
                            books: results
                        });
                    });
            });
        });
    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryapp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.findOne({
                    _id: id
                }, function(err, results) {
                    res.render('bookView', {
                        title: 'Books',
                        nav: nav,
                        book: results
                    });
                });
            });
        });
    return bookRouter;
};

module.exports = router;

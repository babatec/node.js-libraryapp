//Revealing module pattern
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {
    var getIndex = function (req, res) {
        var url = 'mongodb://localhost:27017/libraryapp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.find({})
                .toArray(function (err, results) {
                    res.render('bookList', {
                        title: 'Books',
                        nav: nav,
                        books: results
                    });
                });
        });
    }

    var getById = function (req, res) {
        var id = new ObjectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryapp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.findOne({
                _id: id
            }, function (err, results) {
                //check if books has a book id - we call bookservice else we just render
                if (results.bookId) {
                    bookService.getBookById(results.bookId, function (err, book) {
                        results.book = book;
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    });
                } else {
                    res.render('bookView', {
                        title: 'Books',
                        nav: nav,
                        book: results
                    });
                }


            });
        });
    };

    var middleware = (function (req, res, next) {
        if (!req.user) {
            //If you are a not a logged in user, the go to home page, else continue with business 
            res.redirect('/');
        }
        next();
    });

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;
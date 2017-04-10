//The route is technically a controller in MVC
var express = require('express');

var bookRouter = express.Router();

//To pass a function in the require - i.e the nav
var router = function(nav) {
    var books = [{
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Shevroskinin Kozov',
            read: 'false'
        },
        {
            title: 'Beauty and The Beast',
            genre: 'Crime',
            author: 'Daniel Packer',
            read: 'true'
        },
        {
            title: 'Living in the Wild',
            genre: 'Drama',
            author: 'Maria Ivanovic',
            read: 'false'
        },
        {
            title: 'Arrows in the Red',
            genre: 'Romance',
            author: 'Jon Terry',
            read: 'true'
        },
        {
            title: 'Mask and the Bean',
            genre: 'Action',
            author: 'Steven J Miller',
            read: 'false'
        }
    ];
    //When using the router of express
    bookRouter.route('/')
        .get(function(req, res) {
            res.render('bookList', {
                title: 'Books',
                nav: nav,
                books: books
            });
        });
    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Book',
                nav: nav,
                book: books[id]
            });
        });
    return bookRouter;
};

//Create some books data

module.exports = router;

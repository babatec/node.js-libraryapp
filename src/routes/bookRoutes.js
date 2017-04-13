//The route is technically a controller in MVC
var express = require('express');
var bookRouter = express.Router();

//To pass a function in the require - i.e the nav
var router = function (nav) {
    //Get the book services 
    var bookService =
        require('../services/goodreadsServices')();
    //Lets pass books service
    var bookController =
        require('../controllers/bookController')(bookService, nav);
    //you can only use books route if logged in
    /*
    bookRouter.use(function (req, res, next) {
        if (!req.user) {
            //If you are a not a logged in user, the go to home page, else continue with business 
            res.redirect('/');
        }
        next();
    });
    */
    //bookRouter.use(bookController.middleware);

    //When using the router of express
    bookRouter.route('/')
        .get(bookController.getIndex);
    bookRouter.route('/:id')
        .get(bookController.getById);
    return bookRouter;
};

module.exports = router;
var express = require('express');
var app = express();
var sql = require('mssql');
var bodyParser = require('body-parser');
//Some stuff passport need to work
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

//var port = 3000;
var port = process.env.PORT || 3000;
var nav = [{
    Link: '/books',
    Text: 'Book'
}, {
    Link: '/authors',
    Text: 'Author'
}];

app.use(express.static('public'));
//app.use(express.static('src/views'));
//app.set('view engine', 'jade');
app.set('views', './src/views');

//view template
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

//middleware for password
app.use(cookieParser());
app.use(session({
    secret: 'library'
}));
//We will keep this below lines in a separate file in config
//app.use(passport.initialize());
//app.use(passport.session());
require('./src/config/passport')(app);

//Require the stuff we exported to you - always call this after config
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);
//Require this as middleware
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Library App',
        nav: [{
            Link: '/books',
            Text: 'Books'
        }, {
            Link: '/authors',
            Text: 'Authors'
        }]
    });
});

app.listen(port, function (err) {
    console.log('server running on port ' + port + ' ...');
});
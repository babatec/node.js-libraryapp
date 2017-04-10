var express = require('express');

var app = express();

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
app.set('view engine', 'ejs');
//Require the bookRouter we exported to you
var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);

app.get('/', function(req, res) {
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

app.listen(port, function(err) {
    console.log('server running on port ' + port + ' ...');
});

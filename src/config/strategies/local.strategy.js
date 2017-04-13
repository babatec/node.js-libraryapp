var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, //Validate details here with this function
        function (username, password, done) {
            //check if user data already exist
            var url = 'mongodb://localhost:27017/libraryapp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                collection.findOne({
                    username: username
                }, function (err, results) {
                    if (results.password === password) {
                        var user = results;
                        done(null, user);
                    } else {
                        //Display this
                        //done('Bad password', null);
                        //False means user is not clean 
                        done(null, false, {
                            messsage: 'Bad Paaword'
                        });
                    }
                    //If the user is existing, the done, log em in
                });
            });
            var user = {
                username: username,
                password: password
            };
            done(null, user);
        }));
    //All we are doing till here is taking whatever that is passed and creating a user from it
};
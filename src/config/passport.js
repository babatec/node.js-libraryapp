var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session()); //Saves up user session detail

    passport.serializeUser(function (user, done) {
        done(null, user);
    }); //Bundles up in user session of future uses

    passport.deserializeUser(function (user, done) {
        done(null, user);
    }); //pull the user out of the session

    //Require our authentication startegy either, local, twitter, facebook or whatever

    require('./strategies/local.strategy')();
};
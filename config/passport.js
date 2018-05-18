const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../routes/database');

passport.use('local', new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            where:
                {
                    username: username,
                    password: password
                }
        })
            .then(function (User) {
                if (!User) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                return done(null, User);
            })
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id)
        .then(function (user) {
            cb(null, user);
        });
});
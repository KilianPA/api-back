const bcrypt = require("bcryptjs")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require('../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findByPk(id, (err, user) => {
        done(err, user)
    });
});

// Local Strategy
passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // Match User
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

module.exports = passport;

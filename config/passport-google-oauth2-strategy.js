const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "802186743990-0lbk1vh145u85f5n8noqqo876gn1kvmc.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log('error in google strategy-passport', err);
                return;
            }
            console.log(profile);

            if (user) {
                return done(null, user);
            }
            else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },
                    function (err, user) {
                        if (err) {
                            console.log('error in creating User google passport strategy-passport', err);
                            return;
                        }
                        return done(null, user);
                    });
            }
        });
    }
));
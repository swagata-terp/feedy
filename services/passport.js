const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

//user is whatever we just put into the database
passport.serializeUser((user, done) => {
    //done is kind of a specfic callback for passport?
    
    //user.id is not the profile id, it is the id assigned by the mongo id 
    //we do not use the profile id because we do not always know which profile is
    //currently logged in ie facebook, linkedIn
    done(null,user.id);

    
})

//want to turn the id into a model instance
passport.deserializeUser((id,done) => {
    User.findById(id).then(user => {
        done(null,user);
    })
})

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (acessToken, refreshToken, profile, done) => {

        User.findOne({ googleId: profile.id})
            .then((existingUser) => {
                if(existingUser) {
                    //we already have a record with the given profile ID
                    //callbacks take a done function that tells the promise
                    //was complete. Now done takes two parameters
                    //an error message, which is null in this case and the 
                    //returning data
                    done(null, existingUser);
                } else {
                    //we dont have a user record with this ID, make new record
                    // this creates a new mongo instance of the User model
                    new User({ googleId: profile.id })
                    .save()
                    //this user provided from the callback
                    // is another instance that is the same
                    //as above but we use this one because there might have
                    //been changes made to the top one while it was
                    // being saved
                    .then(user => done(null, user));

                }
            })

    })
);
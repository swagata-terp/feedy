const express = require('express');

const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./models/User')
require('./services/passport')
keys = require('./config/keys')

mongoose.connect(keys.mongoURI);
//we want to do a google auth
//http://localhost:5000/auth/google/callback
//passport.use(new GoogleStrategy());


const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys:[keys.cookieKey]
})
);
app.use(passport.initialize());
app.use(passport.session());


// const authRoutes = require('./routes/authRoutes'); 
// authRoutes(app);
// this is the same as below

require('./routes/authRoutes')(app);



const PORT = process.env.PORT || 5000;
app.listen(PORT);
const express = require('express');

const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
require('./models/User')
require('./models/Survey')
require('./services/passport')
keys = require('./config/keys')

mongoose.connect(keys.mongoURI);
//we want to do a google auth
//http://localhost:5000/auth/google/callback
//passport.use(new GoogleStrategy());


const app = express();
app.use(bodyParser.json())
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys:[keys.cookieKey]
})
);
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV === 'production') {

    //Express needs to server up production assests
    //will serve up index.js file or main.js file

    app.use(express.static('client/build'));

    //Express will serve up the index.html file
    //when it does not recognize the route

    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html')) 
    });
}


// const authRoutes = require('./routes/authRoutes'); 
// authRoutes(app);
// this is the same as below

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
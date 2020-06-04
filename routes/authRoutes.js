
const passport = require('passport');

module.exports = (app) =>  {


    app.get('/', (req,res) =>{
        res.send({bye: 'buddy'});
    });

    app.get(
        '/auth/google/',
        passport.authenticate('google', { //passport knows to take this google string and use it to look for the google stategy 
            scope: ['profile', 'email']  
    })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req,res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req,res) => {

        req.logout();
        res.redirect('/');

    } )

    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    });


};
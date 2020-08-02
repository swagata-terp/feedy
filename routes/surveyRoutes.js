const passport = require('passport')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const mongoose = require('mongoose')
const Mailer = require('../services/Mailer')
const surveyTemplates = require('../services/emailTemplates/surveyTemplates')
const Survey = mongoose.model('surveys')
const _  = require('lodash')
const { Path } = require('path-parser')
const surveyTemplate = require('../services/emailTemplates/surveyTemplates')
const { URL } = require('url')

module.exports = app => {

    app.get('/api/surveys', requireLogin, async (req,res) => {

       const surveys =  await Survey.find({_user: req.user.id})
       .select({ recipients: false})

       res.send(surveys)

    })

    app.post('/api/surveys/webhooks', (req,res) => {
        const p = new Path('/api/surveys/:surveyId/:choice')

     _.chain(req.body)
        .map(({email, url }) => {
            if (!url) {
                return res.status(400).json({ error: 'Some error message' });
            }      
            const match = p.test(new URL(url).pathname);
            if(match) {
                return { email, surveyId: match.surveyId, choice: match.choice }
    
            }
        })
        .compact()
        .uniqBy('email','surveyId')
        .each(({surveyId, email, choice }) => {
            Survey.updateOne({
                _id:surveyId,
                recipients: {
                    $elemMatch : {email:email, responded: false}
                }
            }, {
                $inc: { [choice]: 1},
                $set: { 'recipients.$.responded': true},
                lastResponded: new Date()
            }).exec();
        })
        .value()
    })

    app.get('/api/surveys/:surveyId/:choice', (req,res) => {
        res.send('thanks for voting')
    })

    app.get('/api/surveys/:surveyId/no/thanks', (req,res) => {
        res.send('thanks for voting2')
    })



    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) =>{
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            _user: req.user.id,
            recipients: recipients.split(',').map(email => ({ email: email })),
                
                //({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()

        });

        const mailer = new Mailer(survey, surveyTemplates(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
    
            res.send(user);
        } catch (err) {
            res.status(422).send(err)
        }


    });

}
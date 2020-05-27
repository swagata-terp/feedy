//need to figure out what set of keys to return
if (process.env.NODE_ENV === 'production') {
    //node has a way of finding out whether we are in production or dev
    module.exports = require("./prod")
} else {
    module.exports = require('./dev')
};

const mongoose = require('mongoose');

//const Schema = mongoose.Schema this is the same as below
const { Schema } = mongoose;

//Schemas are the defintions of each models
//mongoose wants to know ahead of time what these
//Schema definitions are 
const userSchema = new Schema({
    googleId: String,
    credits: { type:Number, default: 0}
    
});



mongoose.model('users', userSchema);

//Why do we not require models in services?
// When youre running tests your tests might import
//the model multiple times which might confuse the
//codebase
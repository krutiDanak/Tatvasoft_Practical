var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    userToken: String,
    password: String,
    dob: Date,
}, {
    timestamps: true
});


const User = mongoose.model('user', UserSchema)
module.exports.User = User

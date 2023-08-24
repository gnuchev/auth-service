const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    googleId: String,
    facebookId: String,
    roles: [String]
});

module.exports = mongoose.model('User', userSchema);

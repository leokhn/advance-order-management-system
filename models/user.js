const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, index: true, required: true }, // Adding index to the username field
  password: { type: String, required: true },
  role: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;

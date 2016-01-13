var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	name: String,
	password: String
});

/* BAD */
User.methods.verifyPassword = function(password) {
	return this.password === password;
};

module.exports = User;
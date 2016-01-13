var mongoose = require('mongoose');

var Player = require('./player');
var User = require('./user');

module.exports = {
	game: require('./game'),
	player: mongoose.model('Player', Player, 'players'),
	user: mongoose.model('User', User, 'users')
};
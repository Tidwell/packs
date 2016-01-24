var queue = require('../../lib/queue');

var mongoose = require('mongoose');
var services = require('../../lib/services');

if (mongoose.connection.readyState !== 2) {
	mongoose.connect(services.mongo);
}

var GameModel = require('./models/game');

var games = [];

function handleMessage(data, done) {
	var players = [];
	
	data.players.forEach(function(playerId){
		players.push({userId: playerId, name: playerId});
	});
	var game = new GameModel({players: players});
	game.save(function(err,game){
		queue.send('socket', { to: data.players, data: game.toObject() });
		done();
	});
}

var createGameQueueParser = queue.listen('game-pairing', handleMessage);
var queue = require('../../lib/queue');

var mongoose = require('mongoose');
var services = require('../../lib/services');

if (mongoose.connection.readyState !== 2) {
	mongoose.connect(services.mongo);
}

var create = require('./game').createGame;

var games = {};

function createGame(data, done) {
	var players = [];
	
	data.players.forEach(function(id){
		players.push({id: id, name: id});
	});
	var game = create(players);
	game.start();
	games['game'+Object.keys(games).length] = game;
	sendEvents(game)
}

function sendEvents(game) {
	var playerIds = [];
	game.players.forEach(function(p){
		playerIds.push(p.id);
	});
	game.log.forEach(function(e){
		var toSend = { type: e.type, to: playerIds, data: e.data };
		queue.send('socket', toSend);
	});

}

var createGameQueueParser = queue.listen('game-pairing', createGame);
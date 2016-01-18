var queue = require('../../lib/queue');

var GameModel = require('./models/game');

var games = [];

function handleMessage(message, done) {
	var data = JSON.parse(message.Body);
	var players = [];
	
	data.players.forEach(function(playerId){
		players.push({userId: playerId, name: playerId});
	});
	var game = new GameModel({players: players});
	game.save(function(err,game){
		console.log('New game created: ', game);
		done();
	});
}

var createGameQueueParser = queue.listen('game-pairing', handleMessage);

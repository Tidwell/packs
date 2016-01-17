var config = require('../../config.js');

var aws = require("aws-sdk");
var Consumer = require('sqs-consumer');

var sqs = new aws.SQS({
	region: config.region,
	accessKeyId: config.accessKeyId,
	secretAccessKey: config.secretAccessKey,
});

var queueSender = require('../../lib/queue-sender');

var GameModel = require('./models/game');

var games = [];

var createGameQueueParser = Consumer.create({
	queueUrl: config.queueUrl,
	handleMessage: function(message, done) {
		var data = JSON.parse(message.Body);
		switch (data.type) {
			case 'game-pairing':
				var players = [];
				data.players.forEach(function(playerId){
					players.push({userId: playerId, name: playerId});
				});
				var game = new GameModel({players: players});
				game.save(function(err,game){
					console.log('New game created: ', game);
				});
				break;
			case 'cancel-matchmaking':
				break;
		}
		done();
	},
	sqs: sqs
});

createGameQueueParser.start();

var config = require('../config.js');

var aws = require("aws-sdk");
var Consumer = require('sqs-consumer');

var sqs = new aws.SQS({
	region: config.region,
	accessKeyId: config.accessKeyId,
	secretAccessKey: config.secretAccessKey,
});

var activeSeeks = [];

var app = Consumer.create({
	queueUrl: config.queueUrl,
	handleMessage: function(message, done) {
		var data = JSON.parse(message.Body);
		switch (data.type) {
			case 'matchmaking':
				if (activeSeeks.indexOf(data.id) !== -1) {
					break;
				}
				activeSeeks.push(data.id);
				break;
			case 'cancel-matchmaking':
				if (activeSeeks.indexOf(data.id) === -1) {
					break;
				}
				activeSeeks.splice(activeSeeks.indexOf(data.id), 1);
				break;
		}
		checkPairings();
		done();
	},
	sqs: sqs
});

//randomly pulls 2 players from the queue and pairs them up
function checkPairings() {
	while (activeSeeks.length >= 2) {
		var players = [];
		var rand1 = Math.floor(Math.random()*activeSeeks.length);
		var randomPlayer = activeSeeks.splice(rand1, 1)[0];
		//do it in this order since we need to remove the selected one before we randomly decide the next one
		var rand2 = Math.floor(Math.random()*activeSeeks.length);
		var randomPlayer2 = activeSeeks.splice(rand2, 1)[0];
		players.push(randomPlayer);
		players.push(randomPlayer2);
		console.log('Create game between: ', randomPlayer, randomPlayer2);
	}
	console.log('Awaiting pairings:', activeSeeks);
}

app.start();
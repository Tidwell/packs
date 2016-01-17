var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = require('./player');

var Game = new Schema({
	players: [Player],
	started: Boolean,
	turn: 0,
	activePlayer: 0
});
Game.methods.start = function() {
	this.started = true;
	this.turn = 1;
	//randomly decide who goes first
	this.activePlayer = Math.floor(Math.random()*2);
	this.drawStarting();
	
	return this;
};
Game.methods.newTurn = function() {
	//swithc active player
	this.activePlayer += 1;
	if (this.activePlayer > this.players.length - 1) {
		this.activePlayer = 0;
	}

	//increase the turn count
	this.turn++;

	return this;
};
Game.methods.drawStarting = function() {
	//active player draws for end of turn
	this.players.forEach(function(player) {
		player.endOfTurnDraw();
	});
};

module.exports = mongoose.model('Game', Game, 'games');
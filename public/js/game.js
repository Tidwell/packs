function Game() {
	this.ee = amplify;
	this.players = [];
	this.started = false;
	this.turn = 1;
	this.activePlayer = 0;
	return this;
}
Game.prototype.start = function() {
	this.ee.publish('init', {game: this});
	this.started = true;
	this.turn = 1;
	//randomly decide who goes first
	this.activePlayer = Math.floor(Math.random()*2);
	this.drawStarting();
	
	this.ee.publish('event', {name: 'START OF GAME', game: this});

	return this;
};
Game.prototype.newTurn = function() {
	//swithc active player
	this.activePlayer += 1;
	if (this.activePlayer > this.players.length - 1) {
		this.activePlayer = 0;
	}

	//increase the turn count
	this.turn++;

	this.ee.publish('event', {name: 'START OF TURN ' + this.turn, game: this});
	return this;
};
Game.prototype.drawStarting = function() {
	//active player draws for end of turn
	this.players.forEach(function(player) {
		player.endOfTurnDraw();
	});
};
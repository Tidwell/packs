var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var STARTING_DECK_SIZE = 8;

var Player = new Schema({
	user: Schema.Types.ObjectId,
	name: String,
	zones: {
		deck: [String],
		hand: [String],
		discard: [String],
		play: [String],
		currency: [String]
	}
});

Player.methods.populateDeck = function() {
	for (var i = 0; i < STARTING_DECK_SIZE; i++) {
		this.zones.deck.push('BASE_GAIN1');
	}
};

Player.methods.playCard = function(cardId) {

};

Player.methods.endOfTurnDraw = function() {
	this.draw();
	this.draw();
	this.draw();
};
Player.methods.shuffleIfDrawEmpty = function() {
	if (this.zones.deck.length === 0) {
		this.zones.deck = shuffleArray(this.zones.discard); this.zones.discard = [];
	}
};
Player.methods.draw = function() {
	this.shuffleIfDrawEmpty();
	if (this.zones.deck.length === 0) { return; }
	this.zones.hand.push(this.zones.deck.pop());
};
Player.methods.mill = function() {
	this.shuffleIfDrawEmpty();
	if (this.zones.deck.length === 0) { return; }
	this.zones.discard.push(this.zones.deck.pop());
};

module.exports = Player;
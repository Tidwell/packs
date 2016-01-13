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


function Player(name, pack) {
	var STARTING_DECK_SIZE = 8;

	this.name = name;
	this.pack = pack;
	this.zones = {
		deck: [],
		hand: [],
		discard: [],
		play: [],
	};
	this.currency = 0;

	for (var i = 0; i < STARTING_DECK_SIZE; i++) {
		this.zones.deck.push(new Card(cards.gain1Currency));
	}
}

Player.prototype.playCard = function(cardId) {

};

Player.prototype.endOfTurnDraw = function() {
	this.draw();
	this.draw();
	this.draw();
};
Player.prototype.shuffleIfDrawEmpty = function() {
	if (this.zones.deck.length === 0) { this.zones.deck = shuffleArray(this.zones.discard); this.zones.discard = []; }
};
Player.prototype.draw = function() {
	this.shuffleIfDrawEmpty();
	if (this.zones.deck.length === 0) { return; }
	this.zones.hand.push(this.zones.deck.pop());
};
Player.prototype.mill = function() {
	this.shuffleIfDrawEmpty();
	if (this.zones.deck.length === 0) { return; }
	this.zones.discard.push(this.zones.deck.pop());
};
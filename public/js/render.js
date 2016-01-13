(function($) {
	game.activePlayerName = function() {
		return this.players[this.activePlayer] ? this.players[this.activePlayer].name : 'UNDEFINED PLAYER NAME';
	};

	function init() {
		game.ee.subscribe('init', render);
		game.ee.subscribe('event', update);
	}
	function render() {
		rivets.bind($('[template]'), {game: game});
	}
	function update(ev) {
		console.log('update', ev);
	}
	init();
}(jQuery));
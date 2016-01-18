(function($) {
	var game = {};
	// game.activePlayerName = function() {
	// 	return this.players[this.activePlayer] ? this.players[this.activePlayer].name : 'UNDEFINED PLAYER NAME';
	// };

	function init() {
		var socket = io('http://localhost:3004');
		socket.on('game-event', function(data){
			console.log(data);
		});
	}
	function render() {
		//rivets.bind($('[template]'), {game: game});
	}
	$(init);
}(jQuery));
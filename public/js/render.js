(function($) {
	var game = {};
	// game.activePlayerName = function() {
	// 	return this.players[this.activePlayer] ? this.players[this.activePlayer].name : 'UNDEFINED PLAYER NAME';
	// };

	function load() {
		var s = document.createElement('script');
		s.src = PACKS_SERVICES.socket + '/socket.io/socket.io.js';
		s.onload = init;
		document.body.appendChild(s);
	}

	function init() {
		var socket = io(PACKS_SERVICES.socket);
		socket.on('game-event', function(data){
			console.log(data);
		});
	}
	function render() {
		//rivets.bind($('[template]'), {game: game});
	}
	API.onReady(load);
}(jQuery));
(function($) {
	window.GAME = game = {};
	game.activePlayerName = function() {
		console.log(game);
		return game.data.players[game.data.activePlayer] ? game.data.players[game.data.activePlayer].name : 'UNDEFINED PLAYER NAME';
	};

	function load() {
		var s = document.createElement('script');
		s.src = PACKS_SERVICES.socket + '/socket.io/socket.io.js';
		s.onload = init;
		document.body.appendChild(s);
	}

	function init() {
		window.SOCKET = io(PACKS_SERVICES.socket);
		SOCKET.on('game-event', function(data){
			game.data = data;
		});
	}
	function render() {
		rivets.bind($('[template]'), {game: game});
	}
	$(render);
	API.onReady(load);
}(jQuery));
var game = new Game();

function init() {
	game.ee.subscribe('event', function(gameEvent){
		console.log(gameEvent.name);
		console.log(gameEvent.game);
	});

	var p1 = new Player('player1', new Pack());
	var p2 = new Player('player2', new Pack());
	game.players.push(p1);
	game.players.push(p2);
	game.start();
}
window.addEventListener('load', init, false);
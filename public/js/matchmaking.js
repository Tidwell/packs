(function(API) {
	var data = {};

	var $matchmaking;

	function init() {
		$matchmaking = $('[matchmaking]');
		rivets.bind($matchmaking, {data: data});

		$matchmaking.find('[matchmake]').click(function() {
			API.matchmake()
				.then(function(res){
					data.searching = true;
				})
				.fail(function(res){
					data.searching = false;
				});
		});
	}

	$(init);
}(API));
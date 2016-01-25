(function(API) {
	var data = {};

	var $matchmaking;

	function init() {
		$matchmaking = $('[matchmaking]');
		rivets.bind($matchmaking, {data: data});

		$matchmaking.on('click', '[matchmake]', function() {
			API.matchmake(USERID, USERTOKEN)
				.then(function(res){
					data.searching = true;
				})
				.fail(function(res){
					data.searching = false;
				});
		});
		$matchmaking.on('click', '[cancel]', function() {
			API.cancelMatchmake(USERID, USERTOKEN)
				.then(function(res){
					data.searching = false;
				})
				.fail(function(res){
					//dont do anything this shouldnt happen
					//but if it does let them just click it again
				});
		});
	}

	$(init);
}(API));
var API = (function($) {
	$.ajaxSetup({
		xhrFields: {
			withCredentials: true
		}
	});

	function getServices() {
		$.getJSON('/services.json', function(data){
			window.PACKS_SERVICES = data;
			readyCallbacks.forEach(function(fn){ fn(); });
		});
	}
	$(getServices);

	var readyCallbacks = [];
	var API = {
		login: function(username, password) {
			return $.post(PACKS_SERVICES.auth + '/login', {
				username: username,
				password: password
			});
		},
		register: function(username, password) {
			return $.post(PACKS_SERVICES.auth + '/register', {
				username: username,
				password: password
			});
		},
		logout: function() {
			return $.get(PACKS_SERVICES.auth + '/logout');
		},
		getUser: function() {
			return $.get(PACKS_SERVICES.auth + '/user');
		},

		
		matchmake: function(id, token) {
			return $.post(PACKS_SERVICES.matchmaking + '/search-game', {id: id, token: token});
		},
		cancelMatchmake: function(id, token) {
			return $.post(PACKS_SERVICES.matchmaking + '/cancel-search-game', {id: id, token: token});
		},
		onReady: function(fn) {
			readyCallbacks.push(fn);
		}
	};

	return API;
}(jQuery));
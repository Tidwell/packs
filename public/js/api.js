var API = (function($) {
	$.ajaxSetup({
		xhrFields: {
			withCredentials: true
		}
	});
	var AUTH_DOMAIN = 'http://localhost:3000';
	var MATCHMAKING_DOMAIN = 'http://localhost:3002';

	var API = {
		login: function(username, password) {
			return $.post(AUTH_DOMAIN + '/login', {
				username: username,
				password: password
			});
		},
		logout: function() {
			return $.get(AUTH_DOMAIN + '/logout');
		},
		getUser: function() {
			return $.get(AUTH_DOMAIN + '/user');
		},

		
		matchmake: function(id, token) {
			return $.post(MATCHMAKING_DOMAIN + '/search-game', {id: id, token: token});
		},
		cancelMatchmake: function(id, token) {
			return $.post(MATCHMAKING_DOMAIN + '/cancel-search-game', {id: id, token: token});
		}
	};

	return API;
}(jQuery));
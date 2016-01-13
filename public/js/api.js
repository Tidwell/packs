var API = (function($) {
	$.ajaxSetup({
		xhrFields: {
			withCredentials: true
		}
	});
	var DOMAIN = 'http://localhost:3000';

	var API = {
		auth: function(username, password) {
			return $.post(DOMAIN + '/login', {
				username: username,
				password: password
			});
		},
		logout: function() {
			return $.get(DOMAIN + '/logout');
		},
		matchmake: function() {
			return $.post(DOMAIN + '/search-game');
		},
		getUser: function() {
			return $.get(DOMAIN + '/user');
		}
	};

	return API;
}(jQuery));
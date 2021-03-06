'use strict';

angular.module('packsApp').factory('api', ['$http', 'allServices', function($http, allServices) {
	var config = {
		withCredentials: true
	};

	var services;

	allServices.get().then(function(s){ services = s; });
	
	var API = {
		login: function(username, password) {
			return $http.post(services.auth + '/login', {
				username: username,
				password: password
			}, config);
		},
		register: function(username, password) {
			return $http.post(services.auth + '/register', {
				username: username,
				password: password
			}, config);
		},
		logout: function() {
			return $http.get(services.auth + '/logout', config);
		},
		getUser: function() {
			return $http.get(services.auth + '/user', config);
		},

		
		matchmake: function(id, token) {
			return $http.post(services.matchmaking + '/search-game', {id: id, token: token}, config);
		},
		cancelMatchmake: function(id, token) {
			return $http.post(services.matchmaking + '/cancel-search-game', {id: id, token: token}, config);
		},
		getGame: function(id, token) {
			return $http.post(services.game + '/game', {id: id, token: token}, config);
		}
	};

	return API;
}]);

angular.module('packsApp').factory('allServices', ['$window', '$http', function($window, $http) {
	var services;
	function get() {
		return $http.get('/services.json').then(function(res){
			services = res.data;
			return services;
		}, function(err) {
			$window.alert('Cannot get services list.');
			console.log(err);
		});
	}

	return {
		get: get
	};
}]);
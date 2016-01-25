'use strict';
(function() {
	var services;

	var ready = [];
	var emitRdy = [];
	var loaded = false;
	var globalSocket;

	angular.module('packsApp').factory('socket', ['allServices', '$rootScope', function(allServices, $rootScope) {
		var socket = {
			on: function(eventName, callback) {
				if (!loaded) {
					return ready.push({ev: eventName, fn: callback});
				}
				var self = this;
				globalSocket.on(eventName, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						callback.apply(globalSocket, args);
					});
				});
			},
			emit: function(eventName, data, callback) {
				if (!loaded) {
					return emitRdy.push({ev: eventName, data: data, fn: callback});
				}
				var self = this;
				globalSocket.emit(eventName, data, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						if (callback) {
							callback.apply(globalSocket, args);
						}
					});
				});
			},
			socket: globalSocket
		};

		if (loaded) {
			console.log('early ret', socket)
			return socket;
		}

		allServices.get().then(function(data) {
			services = data;
			load();
		});

		function load() {
			var s = document.createElement('script');
			s.src = services.socket + '/socket.io/socket.io.js';
			s.onload = init;
			document.body.appendChild(s);
		}

		function init() {
			console.log('initing')
			globalSocket = window.io(services.socket);
			ready.forEach(function(rdy) {
				console.log('unspool ready', rdy)
				globalSocket.on(rdy.ev, rdy.fn);
			});
			emitRdy.forEach(function(rdy) {
				console.log('unspool readyemit', rdy)
				globalSocket.emit(rdy.ev, rdy.data, rdy.fn);
			});
			ready = [];
			emitRdy = [];
			loaded = true;
		}
		console.log('late ret', socket)
		return socket;
	}]);
}());
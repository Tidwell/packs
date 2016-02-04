'use strict';

/**
 * @ngdoc function
 * @name packsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the packsApp
 */
(function() {
	var events = [
		'known-info-change',
		'public-info-change',
		'start-of-turn',
		'start-of-game',
	];

	angular.module('packsApp').controller('GameCtrl', function(socket, user, $scope) {
		var vm = this;
		vm.user = user.get();
		vm.data = {};

		function handleGameEvent(data) {
			console.log('handle event', data);
			vm.data = data;
		}

		events.forEach(function(e){
			socket.on(e, handleGameEvent);
		});

		$scope.$on('$destroy', function() {
			if (socket.socket) {
				events.forEach(function(e){
					socket.socket.removeAllListeners(e);
				});
			}
		});
	});

}());
'use strict';

/**
 * @ngdoc function
 * @name packsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the packsApp
 */
(function() {

	angular.module('packsApp').controller('GameCtrl', function(socket, user, $scope) {
		var vm = this;
		vm.user = user.get();
		vm.data = {};

		function handleGameEvent(data) {
			console.log('handle event', data);
			vm.data = data;
		}

		socket.on('game-event', handleGameEvent);

		$scope.$on('$destroy', function() {
			if (socket.socket) {
				socket.socket.removeAllListeners('game-event');
			}
		});
	});

}());
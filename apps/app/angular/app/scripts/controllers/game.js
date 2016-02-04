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
		'zone:created',
		'phase:created',
		'game:addedPhase',
		'zone:addedZone',
		'stack:created',
		'zone:addedStack',
		'player:created',
		'game:addedPlayer',
		'stack:addedCard',
		'card:created',
		'card:zoneChange',
		'card:stackChange',
		'stack:shuffledCards',
		'stack:removedCard',
		'game:started',
		'game:activePlayerChange',
		'game:newTurn',
		'game:activePhaseChange',
		'phase:entered'
	];

	angular.module('packsApp').controller('GameCtrl', function(socket, user, $scope) {
		var vm = this;
		vm.user = user.get();
		vm.data = {};

		function handleGameEvent(data) {
			console.log('handle event', JSON.parse(data));
			vm.data = data;
		}

		// events.forEach(function(e){
		// 	socket.on(e, handleGameEvent);
		// });
		socket.on('game-event', handleGameEvent);

		$scope.$on('$destroy', function() {
			if (socket.socket) {
				events.forEach(function(e){
					socket.socket.removeAllListeners(e);
				});
			}
		});
	});

}());
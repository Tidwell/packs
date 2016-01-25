'use strict';

/**
 * @ngdoc function
 * @name packsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the packsApp
 */
angular.module('packsApp')
	.controller('MatchmakingCtrl', function($scope, user, api) {
		var vm = this;
		vm.user = user.get();
		vm.searching = false;

		vm.search = function() {
			api.matchmake(vm.user.id, vm.user.token).then(function() {
				vm.searching = true;
			});
		};
		vm.cancel = function() {
			api.cancelMatchmake(vm.user.id, vm.user.token).then(function() {
				vm.searching = false;
			});
		};
	});
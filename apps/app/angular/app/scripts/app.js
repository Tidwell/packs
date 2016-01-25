'use strict';

/**
 * @ngdoc overview
 * @name packsApp
 * @description
 * # packsApp
 *
 * Main module of the application.
 */
angular
	.module('packsApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch'
	])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
				controllerAs: 'main'

			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'login'
			})
			.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'RegisterCtrl',
				controllerAs: 'register'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true).hashPrefix('!');

	});
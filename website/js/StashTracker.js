define(function (require){
	'use strict';

	var angular = require('angular');
	var ngRoute = require('angular-route');
	var stashTabController = require('./controllers/StashTabController');
	var stashTabService = require('./services/StashTabService');
	var toggleCheckboxDirective = require('./directives/ToggleCheckboxDirective');

	var StashTrackerApp = angular.module('StashTabTracker', ['ngRoute']);
	
	StashTrackerApp.init = function (){
		angular.bootstrap(document, ['StashTabTracker']);
	}

	StashTrackerApp.controller('StashTabController', stashTabController)
	StashTrackerApp.service('StashTabService', stashTabService)
	StashTrackerApp.directive('toggleCheckbox', toggleCheckboxDirective);

	StashTrackerApp.config(['$routeProvider', function ($routeProvider){
		$routeProvider.when('/', {
			controller: 'StashTabController'
		});

		$routeProvider.otherwise({
			controller: 'StashTabController'
		});
	}]);

	return StashTrackerApp;
});
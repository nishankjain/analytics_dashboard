var demoAppControllers = angular.module('demoControllers', []);

demoAppControllers.controller('chartController', ['$scope', function($scope) {
	$scope.charts = charts;
}]);
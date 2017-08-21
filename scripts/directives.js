var demoAppDirectives = angular.module('demoDirectives', []);
var dataArray = [
	{"letter":"A","frequency":0.08167},
	{"letter":"B","frequency":0.01492},
	{"letter":"C","frequency":0.0278},
	{"letter":"D","frequency":0.04253},
	{"letter":"E","frequency":0.12702},
	{"letter":"F","frequency":0.02288},
	{"letter":"G","frequency":0.02022},
	{"letter":"H","frequency":0.06094},
	{"letter":"I","frequency":0.06973},
	{"letter":"J","frequency":0.00153},
	{"letter":"K","frequency":0.00747},
	{"letter":"L","frequency":0.04025},
	{"letter":"M","frequency":0.02517},
	{"letter":"N","frequency":0.06749},
	{"letter":"O","frequency":0.07507},
	{"letter":"P","frequency":0.01929},
	{"letter":"Q","frequency":0.00098},
	{"letter":"R","frequency":0.05987},
	{"letter":"S","frequency":0.06333},
	{"letter":"T","frequency":0.09056},
	{"letter":"U","frequency":0.02758},
	{"letter":"V","frequency":0.01037},
	{"letter":"W","frequency":0.02465},
	{"letter":"X","frequency":0.0015},
	{"letter":"Y","frequency":0.01971},
	{"letter":"Z","frequency":0.00074}
];

demoAppDirectives.directive('changeChart', function() {
	return {
		restrict: 'A',
		scope: true,
		link: function(scope, element, attrs) {
			element
			.on('click', function() {
				var currentlyActiveElement = document.querySelector(".currently-active");
				if (currentlyActiveElement) {
					var angularElement  = angular.element(currentlyActiveElement);
					// console.log(angularElement.scope());
					if (angularElement.scope().activeChart) {
						angularElement.empty();
						var selectedChartType = attrs.value;
						angularElement.scope().divChartType = selectedChartType;
						renderChart(selectedChartType, currentlyActiveElement, dataArray);
					}
				}
			});
		}
	};
});

demoAppDirectives.directive('cardsDiv', function() {
	return {
		restrict: 'A',
		scope: true,
		link: function(scope, element, attrs) {
			function generateUUID() {
			    var d = new Date().getTime();
			    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			        var r = (d + Math.random()*16)%16 | 0;
			        d = Math.floor(d/16);
			        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
			    });
			    return uuid;
			}

			if (element.hasClass('currently-active')) {
				scope.activeChart = true;
			}
			else {
				scope.activeChart = false;
			}

			scope.divChartType = "";
			scope.chartId = generateUUID();

			element
			.on('click', function() {
				if (!scope.activeChart) {
					scope.activeChart = true;
					var lastActiveElement = angular.element(document.getElementsByClassName('currently-active'));
					if (lastActiveElement[0]) {
						lastActiveElement.removeClass('currently-active');
						lastActiveElement.scope().activeChart = false;
						lastActiveElement.css('box-shadow', '0 1px 5px 0 rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12)').css('transition', 'box-shadow 0.1s linear 0s');
					}
					element.css('box-shadow', '0px 0px 10px 2px rgba(138,138,138,1)');
					element.css('transition', 'box-shadow 0.1s linear 0s');
					element.addClass('currently-active');
				}
				// if (scope.divChartType) {
				// 	var chartSelect = angular.element(document.getElementById('chart-select'));
				// 	console.log(chartSelect.scope());
				// 	chartSelect.scope().chart.type = scope.divChartType;
				// 	console.log(chartSelect.scope());
				// }
			});
		}
	};
});

demoAppDirectives.directive('splitHori', function($compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('click', function() {
				var currentlyActiveElement = document.querySelector(".currently-active");
				if (currentlyActiveElement) {
					var angularElement  = angular.element(currentlyActiveElement);
					if (angularElement.scope().activeChart) {
						splitHorizontally(currentlyActiveElement, $compile, scope);
					}
				}
			});
		}
	};
});

demoAppDirectives.directive('splitVert', function($compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('click', function() {
				var currentlyActiveElement = document.querySelector(".currently-active");
				if (currentlyActiveElement) {
					var angularElement  = angular.element(currentlyActiveElement);
					if (angularElement.scope().activeChart) {
						splitVertically(currentlyActiveElement, $compile, scope);
					}
				}
			});
		}
	};
});

var splitHorizontally = function(currentlyActiveElement, $compile, scope) {
	var active_top = parseFloat(currentlyActiveElement.style.top);
	var active_right = parseFloat(currentlyActiveElement.style.right);
	var active_bottom = parseFloat(currentlyActiveElement.style.bottom);
	var active_left = parseFloat(currentlyActiveElement.style.left);

	if (active_right === 0) {
		current_active_right = (100 - active_right - active_left) / 2;
	}
	else {
		current_active_right = active_right + (100 - active_right - active_left) / 2;
	}

	var new_top = active_top + '%';
	var new_right = active_right + '%';
	var new_bottom = active_bottom + '%';
	var new_left = (100 - current_active_right) + '%';

	currentlyActiveElement.style.right = (current_active_right) + '%';
	angular.element(currentlyActiveElement).css('transition', 'right 0.2s linear 0s');

	var el = $compile("<div class='chart-div' cards-div chart-id='{{chartId}}'></div>")(scope);
	el.css({
		'top': new_top,
		'right': new_right,
		'bottom': new_bottom,
		'left': new_left,
		'box-shadow': '0 1px 5px 0 rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12)',
		'transition': 'right 0.1s linear 0s'
	});
	angular.element(currentlyActiveElement).after(el);
};

var splitVertically = function(currentlyActiveElement, $compile, scope) {
	var active_top = parseFloat(currentlyActiveElement.style.top);
	var active_right = parseFloat(currentlyActiveElement.style.right);
	var active_bottom = parseFloat(currentlyActiveElement.style.bottom);
	var active_left = parseFloat(currentlyActiveElement.style.left);

	if (active_bottom === 0) {
		current_active_bottom = (100 - active_top - active_bottom) / 2;
	}
	else {
		current_active_bottom = active_bottom + (100 - active_bottom - active_top) / 2;
	}

	var new_top = (100 - current_active_bottom) + '%';
	var new_right = active_right + '%';
	var new_bottom = active_bottom + '%';
	var new_left = active_left + '%';

	currentlyActiveElement.style.bottom = (current_active_bottom) + '%';
	angular.element(currentlyActiveElement).css('transition', 'bottom 0.2s linear 0s');
	var el = $compile("<div class='chart-div' cards-div chart-id='{{chartId}}'></div>")(scope);
	el.css({
		'top': new_top,
		'right': new_right,
		'bottom': new_bottom,
		'left': new_left,
		'box-shadow': '0 1px 5px 0 rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12)',
		'transition': 'right 0.1s linear 0s'
	});
	angular.element(currentlyActiveElement).after(el);
};
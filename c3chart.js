'use strict';

/**
 * @ngdoc directive
 * @name times.c3chart.directive:c3chart
 * @description
 * # c3chart
 */
angular.module('times.c3chart', [])
  .directive('c3chart', function ($window) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.config, function (v) {
            if(typeof v !== 'undefined') { 
                var config = scope[attrs.config];
                config.bindto = element[0];
                $window.c3.generate(config);
            }
        });
      }
    };
  });

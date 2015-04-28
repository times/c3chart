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
        var chart;
        scope.$watch(attrs.config, function (newValue, oldValue) {
          if(typeof newValue !== 'undefined') { 
            var config = newValue;
            config.bindto = element[0];
            
            if (oldValue) { // Chart already exists
              
              // Mutate the values to remove all data
              var copyA = _.cloneDeep(newValue); // Why angular.copy doesn't work here is beyond me.
              var copyB = _.cloneDeep(oldValue);
              
              ['columns', 'rows', 'json'].forEach(function(v){
                copyA.data[v] = undefined;
                copyB.data[v] = undefined;
              });

              // Check whether the two values are data only, or require a full generate()
              var isData = angular.equals(copyA, copyB);
              
              if (isData) { // Only data change; update using chart.load();
                var dataKeys = Object.keys(newValue.data);
                var type = dataKeys.indexOf('columns') > -1 ? 'columns' : dataKeys.indexOf('json') > -1 ? 'json' : dataKeys.indexOf('rows') > -1 ? 'rows' : 'undefined';
                var data = {};
                data[type] = newValue.data[type];
                if (typeof(chart) !== 'undefined') {
                  // chart.unload(); // TODO unload if data names change.
                  chart.load(data);
                }
              } else { // Requires a destroy() and a generate().
                if (typeof(chart.destroy) !== 'undefined') {
                  chart.destroy();
                }
                
                chart = $window.c3.generate(config);
              }
            } else { // Brand new chart; just generate().
              chart = $window.c3.generate(config);
            }
          }
          
          angular.element($window).bind('orientationchange', function () {
            chart.flush();
          });
        });
      }
    };
  });

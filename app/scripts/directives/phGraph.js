'use strict';

angular.module('phosphoApp')
  .directive('phGraph', function () {
    return {
      templateUrl: 'directive-templates/ph-graph.html',
      restrict: 'A',
      scope: {
        figureType: '=',
        data: '='
      },
    };
  });

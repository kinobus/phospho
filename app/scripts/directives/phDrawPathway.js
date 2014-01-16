'use strict';

angular.module('phosphoApp')
  .directive('phDrawPathway', function () {
    return {
      templateUrl: 'directive-templates/ph-draw-pathway.html',
      restrict: 'E'
    };
  });

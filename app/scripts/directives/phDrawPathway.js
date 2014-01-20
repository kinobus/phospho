'use strict';

angular.module('phosphoApp')
  .directive('phDrawPathway', function () {
    return {
      templateUrl: 'views/ph-draw-pathway.html',
      restrict: 'E',
      controller: 'DrawPathwayCtrl'
    };
  });

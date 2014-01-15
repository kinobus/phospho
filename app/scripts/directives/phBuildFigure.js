'use strict';

angular.module('phosphoApp')
  .directive('phBuildFigure', function () {
    return {
      templateUrl: 'directive-templates/ph-build-figure.html',
      restrict: 'E'
    };
  });

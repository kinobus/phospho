'use strict';

angular.module('phosphoApp')
  .directive('phBuildFigure', function () {
    return {
      controller: 'BuildFigureCtrl',
      templateUrl: 'directive-templates/ph-build-figure.html',
      restrict: 'E'
    };
  });

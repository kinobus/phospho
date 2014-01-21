'use strict';

angular.module('phosphoApp')
  .directive('phBuildFigure', function () {
    return {
      controller: 'BuildFigureCtrl',
      templateUrl: 'views/ph-build-figure.html',
      restrict: 'E'
    };
  });

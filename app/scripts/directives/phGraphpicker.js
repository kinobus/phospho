'use strict';

angular.module('phosphoApp')
  .directive('phGraphpicker', function () {
    return {
      templateUrl: 'directive-templates/ph-graphpicker.html',
      restrict: 'C'
    };
  });

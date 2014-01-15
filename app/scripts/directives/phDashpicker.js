'use strict';

angular.module('phosphoApp')
  .directive('phDashpicker', function () {
    return {
      templateUrl: 'directive-templates/ph-dashpicker.html',
      restrict: 'E'
    };
  });

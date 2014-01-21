'use strict';

angular.module('phosphoApp')
  .directive('phDashpicker', function () {
    return {
      templateUrl: 'views/ph-dashpicker.html',
      restrict: 'E'
    };
  });

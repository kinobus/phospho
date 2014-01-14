'use strict';

angular.module('phosphoApp')
  .directive('phDashboard', function () {
    return {
      templateUrl: 'directive-templates/ph-dashboard.html',
      restrict: 'E',
      scope: { // attributes bound to the scope of the directive
        d: '='
      }
    };
  });

'use strict';

angular.module('phosphoApp')
  .directive('phDashboard', function () {
    return {
      templateUrl: 'directive-templates/ph-dashboard.html',
      restrict: 'E'
    };
  });

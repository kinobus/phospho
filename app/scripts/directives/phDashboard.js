'use strict';

angular.module('phosphoApp')
  .directive('phDashboard', function () {
    return {
      templateUrl: 'views/ph-dashboard.html',
      restrict: 'E'
    };
  });

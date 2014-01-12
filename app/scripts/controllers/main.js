'use strict';

angular.module('phosphoApp')
  .controller('MainCtrl', function ($scope, $filter, dashboards) {
    $scope.dashboards = dashboards.getDashboards();
    $scope.dashboard = $scope.dashboards[0];

    $scope.setDash = function (d) {
      return $scope.dashboard = d;
    };

    $scope.filterGroups = [
      {
        'id':'myObjects',
        'title':'My Collection',
        'userlist': [{'user':'selfUser'}]
      },
      {
        'id':'moonlabObjects',
        'userlist': [{'group':'moonLab'}]
      }
    ];
  });

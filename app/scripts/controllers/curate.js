'use strict';

angular.module('phosphoApp')
  .controller('CurateCtrl', function ($scope, loginService) {
    $scope.logout = function() {
      loginService.logout()
      $location.path('/');
    };
  });

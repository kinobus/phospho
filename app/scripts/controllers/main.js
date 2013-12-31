'use strict';

angular.module('phosphoApp')
  .controller('MainCtrl', function ($scope, loginService, $location) {
    $scope.login = function() {
      $scope.err = null;
      loginService.login(function(err, user) {
        $scope.err = err? err + '' : null;
        if( !err ) {
          $location.replace();
          $location.path('/');
        }
      });
    };

    $scope.logout = function() {
      loginService.logout();
      $location.path('/');
    };

    //jQuery typer function
    $(function () {
      $('[data-typer-targets]').typer();
    });
  });
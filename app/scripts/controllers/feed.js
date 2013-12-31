'use strict';

angular.module('phosphoApp')
  .controller('FeedCtrl', function ($scope, loginService, $firebase, $location) {

    $scope.logout = function() {
      loginService.logout();
      $location.path('/');
    };

    $scope.kinomes = $firebase(new Firebase('https://phospho.firebaseio.com/kinomes'));

    $scope.kinomeScale = 0.125;

  });

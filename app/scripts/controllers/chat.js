'use strict';

angular.module('phosphoApp')
  .controller('ChatCtrl', function ($scope, $firebase) {
      $scope.users = $firebase(new Firebase('https://phospho.firebaseio.com/users'));
    });

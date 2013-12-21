'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope, Buildkinome, $firebase) {

    $scope.interactomes = $firebase(new Firebase('https://phospho.firebaseio.com/interactomes'));

    $scope.kinome = new Buildkinome.build([0.5, 0.3, 0.2]);

    $scope.loadedInteractome = 'nothing loaded yet';
    $scope.kinomelinks = 'empty link';

    $scope.loadInteractome = function(title, links) {
      $scope.loadedInteractome = title;
      $scope.kinomelinks = links;
    };
  });

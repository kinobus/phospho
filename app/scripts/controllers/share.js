'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope, Buildkinome, $firebase) {

    $scope.interactomes = $firebase(new Firebase('https://phospho.firebaseio.com/interactomes'));

    $scope.loadedInteractome = 'blank interactome';
    $scope.kinomelinks = 'empty link';

    $scope.selectInteractome = function(title, links) {
      $scope.loadedInteractome = title;
      $scope.kinomelinks = links;
    };

    $scope.ms2datasets = $firebase(new Firebase('https://phospho.firebaseio.com/ms2datasets'));

    $scope.loadedMs2dataset = 'blank dataset';
    $scope.ms2means = 'empty means';

    $scope.selectMs2dataset = function(title, data) {
      $scope.loadedMs2dataset = title;
      $scope.ms2means = data;
    };

    $scope.kinome = new Buildkinome.build([0.5, 0.3, 0.2]);
  });

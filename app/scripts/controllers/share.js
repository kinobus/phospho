'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope, Buildkinome, $firebase) {

    //$scope.testitems = $firebase(new Firebase('https://phospho2.firebaseio.com/testitems'));
    //$scope.item = $scope.testitems[0]

    //$scope.interactomes = $firebase(new Firebase('https://phospho.firebaseio.com/interactomes'));
    //$scope.interactome = $scope.interactomes[0];

    $scope.ms2datasets = $firebase(new Firebase('https://phospho.firebaseio.com/ms2datasets'));

    $scope.change = function() {
      var values = $scope.dataset.data;
      $scope.kinome = [];
      angular.forEach(values, function(value, key){
        this.push(value.Gene);
      }, $scope.kinome);
    };


    //$scope.kinome = new Buildkinome.build([0.5, 0.3, 0.2]);
  });

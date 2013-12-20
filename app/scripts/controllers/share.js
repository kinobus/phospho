'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope, Buildkinome) {
    $scope.kinome = new Buildkinome.build([0.5, 0.3, 0.2]);

    $scope.Interactomes = [{
      "ID": 1,
      "Links": "itemone",
      "Name": "Item One"
    }, {
      "ID": 2,
      "Links": "itemtwo",
      "Name": "Item Two"
    }, {
      "ID": 3,
      "Links": "itemthree",
      "Name": "Item Three"
    }, {
      "ID": 5,
      "Links": "whereisfour",
      "Name": "Item Five"
    }];

    $scope.loadedInteractome = 'nothing loaded yet';
    $scope.kinomelinks = 'empty link';

    $scope.loadInteractome = function(name, links) {
      $scope.loadedInteractome = name;
      $scope.kinomelinks = links;
    }
  });

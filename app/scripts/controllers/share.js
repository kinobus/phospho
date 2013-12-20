'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope, Buildkinome) {
    $scope.kinome = new Buildkinome.build([0.5, 0.3, 0.2]);
  });

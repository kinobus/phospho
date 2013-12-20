'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope) {
    $scope.kinome = { 'kinases' : [
      {
        'GeneSymb' : 'BARK1',
        'Mean' : 0.4
      },
      {
        'GeneSymb' : 'AKT1',
        'Mean' : 0.2
      }
    ]};
  });

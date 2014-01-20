'use strict';

angular.module('phosphoApp')
  .controller('BuildFigureCtrl', function ($scope) {
    //initialize dataset
    $scope.dataset = $scope.user.collection.datasets[0];

    //intitialize figureType
    $scope.figureType = 'pathway';

    //function for binding data to pathway or kinome
    $scope.bindData = function () {

    };
  });

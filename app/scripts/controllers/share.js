'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope, Buildkinome) {
    //initialize
    $scope.ksi = 'PhosphoNET';

    //dropdown menus to choose ms2dataset and ksi
    $scope.ms2Dropdown = [
      {text: 'dasatinib vs dmso', click: "$alert('dasatinib')"},
      {text: 'ibrutinib vs dmso', click: "$alert('ibrutinib')"}
    ];

    $scope.ksiDropdown = [
      {text: 'PhosphoNET', click: "$scope.ksi('PhosphoNET')"},
      {text: 'Cell Signaling', click: "$scope.ksi('Cell Signaling')"}
    ];

    //build the kinome for display using the Buildkinome service
    $scope.kinome = new Buildkinome.build([0.5, 0.3, 0.2]);
  });

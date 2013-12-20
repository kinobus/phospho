'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope, Buildkinome) {

    $scope.dropdown = [
      {text: 'Another action', href: '#anotherAction'},
      {text: 'Something else here', click: "$alert('working ngClick!')"},
      {divider: true},
      {text: 'Separated link', href: '#',
        submenu: [
          {text: 'Second level link', href: '#'},
          {text: 'Second level link 2', href: '#'}
        ]}
      ];

    $scope.kinome = new Buildkinome.build([0.5, 0.3, 0.2]);
  });

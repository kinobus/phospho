'use strict';

angular.module('phosphoBaseApp')
  .controller('MainCtrl', function ($scope, $rootScope, PhosphoIO, figureFactory) {


    $scope.newPathway = new figureFactory.pathway();

    // $scope.newPathway = {
    //   'graph': new figureFactory.pathwayGraph(),
    //   'type': 'pathway',
    //   'isImmutable': false,
    //   'title': 'Untitled New Figure'
    // };

    $scope.gridSelect = function (selection) {
      //clear selection if no selection was specified
      if (!selection) {
        $scope.gridSelection = null;
      } else {
        $scope.gridSelection = angular.copy(selection);
      }
    };

    $scope.sharedFigs = [
      {
        'title':'Phosphoproteome of DLBCL',
        'author':'Ricker',
        'content':'kinome',
        'flasks':15,
        'forks': 3
      },
      {
        'title':'Integrated Colon Cancer Screen',
        'author':'James',
        'content':'pathway',
        'flasks':12,
        'forks': 2
      },
      {
        'title':'DUX4 in FSHD',
        'author':'Greg',
        'content':'pathway',
        'flasks':9,
        'forks': 7
      },
      {
        'title':'Vemurafinib Resistance and WNT',
        'author':'Kathy',
        'content':'pathway',
        'flasks':4,
        'forks': 0
      }
    ];

    $scope.publishedFigs = PhosphoIO;

    $scope.publish = function (figure) {
      figure.isImmutable = true;
      figure.flasks = 0;
      figure.forks = 0;
      if ($rootScope.user) {
        figure.author = $rootScope.user.email;
      } else {
        figure.author = 'guest';
      }
      $scope.publishedFigs.$add(figure);
    };

    $scope.panelNewPathwayOptions = {
      'scale': 1,
      'editable': true
    };

    $scope.displayScale = {
      'gridblock': 0.25,
      'focus': 1
    };

    $scope.gridblockPublishedOptions = {
      'scale':0.25,
      'editable': false
    };
  });

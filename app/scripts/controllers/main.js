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

    $scope.clickItem = function (selection, mutable) {
      //clear selection if no selection was specified
      if (!selection) {
        $scope.selectedItem = null;
      }
      if (mutable) {
        $scope.selectedItem.mutable = true;
        $scope.selectedItem = angular.copy(selection);
      } else {
        $scope.selectedItem = selection;
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

    $scope.publish = function (snapshot) {
      $scope.selectedItem.mutable = false;
      snapshot.flasks = 0;
      snapshot.forks = 0;
      if ($rootScope.user) {
        snapshot.author = $rootScope.user.email;
      } else {
        snapshot.author = 'guest';
      }
      $scope.publishedFigs.$add(snapshot);
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

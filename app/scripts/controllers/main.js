'use strict';

angular.module('phosphoBaseApp')
  .controller('MainCtrl', function ($scope, $rootScope, PhosphoIO, figureFactory, $modal) {


    $scope.newPathway = new figureFactory.pathway();

    // $scope.newPathway = {
    //   'graph': new figureFactory.pathwayGraph(),
    //   'type': 'pathway',
    //   'isImmutable': false,
    //   'title': 'Untitled New Figure'
    // };


    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/figure-modal.html'
      });
    };

    $scope.clickItem = function (selection, mutable) {

      if (mutable) {
        selection.mutable = true;
        $rootScope.selectedItem = angular.copy(selection);
      } else {
        $rootScope.selectedItem = selection;
      }
      $scope.open();
    };

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

    $rootScope.displayScale = {
      'gridblock': 0.25,
      'focus': 1
    };
  });

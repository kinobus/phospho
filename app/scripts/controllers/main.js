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
      $rootScope.alerts = [];
      $modal.open({
        templateUrl: 'views/figure-modal.html'
      });
    };

    $scope.clickItem = function (selection, mutable) {

      if (mutable) {
        $rootScope.mutableSelection = true;
        $rootScope.selectedItem = angular.copy(selection);
      } else {
        $rootScope.selectedItem = selection;
      }
      $scope.open();
    };

    $scope.publishedFigs = PhosphoIO;

    $rootScope.addAlert = function(alertType, alertMsg) {
      $rootScope.alerts.push({type: alertType,msg: alertMsg});
    };

    $rootScope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $rootScope.fork = function (selection) {
      //add a fork count
      $rootScope.parentFigure = selection;
      //$scope.publishedFigs.$save();

      //make snapshot into mutable selection
      $rootScope.selectedItem = angular.copy(selection);
      $rootScope.mutableSelection = true;
      $rootScope.selectedItem.forks = 0;
    };

    $rootScope.publish = function (snapshot) {
      if (!$rootScope.user) {
        $rootScope.addAlert('info','In order to publish, first log-in');
        return;
      } else if (!snapshot.hasTitle) {
        $rootScope.addAlert('danger','In order to publish, first edit the title this figure');
        return;
      }

      if ($rootScope.parentFigure) {
        //add username onto forklist
      }
      $rootScope.mutableSelection = false;
      snapshot.flasks = 0;
      snapshot.forks = 0;
      var d = new Date();
      snapshot.pubDate = d.getTime();
      if ($rootScope.user) {
        snapshot.author = $rootScope.user.email;
      } else {
        snapshot.author = 'guest';
      }
      $scope.publishedFigs.$add(snapshot);
      //$rootScope.selectedItem = null;
    };

    $rootScope.displayScale = {
      'gridblock': 0.25,
      'focus': 1
    };
  });

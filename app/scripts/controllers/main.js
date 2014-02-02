'use strict';

angular.module('phosphoBaseApp')
  .controller('MainCtrl', function ($scope, $rootScope, PhosphoIO, figureFactory, $modal) {

    $scope.newPathway = new figureFactory.pathway();

    $scope.open = function () {
      $rootScope.alerts = [];
      $scope.modalInstance = $modal.open({
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

    //TODO consider combining the two lines below
    $scope.phosphoIO = PhosphoIO;
    $scope.figures = $scope.phosphoIO.$child('figures');

    $scope.figures.$on('loaded', function() {
      var counter = 0;
      angular.forEach($scope.figures, function(key, value){
        counter++;
      });
      $scope.figureCount = counter - 11;
    });


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
      if (!$rootScope.auth.user) {
        $rootScope.addAlert('success','Log In if you\'d like to share your figure with the community.');
        return;
      } else if (!snapshot.hasTitle) {
        $rootScope.addAlert('danger','Give this figure a brief title');
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
      if ($rootScope.auth.user) {
        snapshot.author = $rootScope.auth.user.email;
        $scope.figures.$add(snapshot);

        //close modal
        $scope.modalInstance.close();
      } else {
        $rootScope.addAlert('danger','For some reason, your figure was not published.');
      }
      //$rootScope.selectedItem = null;
    };

    $rootScope.displayScale = {
      'gridblock': 0.25,
      'focus': 1
    };
  });

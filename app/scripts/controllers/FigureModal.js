'use strict';

angular.module('phosphoBaseApp')
  .controller('FiguremodalCtrl', function ($scope, $rootScope, PhosphoIO) {

    //insert an alert in the figure modal window
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
      $rootScope.selectedItem.mutable = true;
      $rootScope.selectedItem.forks = 0;
    };

    $rootScope.publish = function (figure) {

      //Check if user is logged in, if not return login alert
      if (!$rootScope.auth.user) {
        $rootScope.addAlert('info','Log In if you\'d like to share your figure with the community.');
        return;

      //Check if user has titled figure, if not return title alert
      } else if (!figure.hasTitle) {
        $rootScope.addAlert('danger','Give this figure a brief title');
        return;
      }

      //publish figure then add metadata to figureMap
      $rootScope.publishedFigs = PhosphoIO.fbSync('figures', 1);

      $rootScope.publishedFigs.$add({'graph': figure.graph}).then(function (p) {

        var pubDate = new Date().getTime();

        var mapEntry = {
          'figureKey': p.name(),
          'author': $rootScope.auth.user.email,
          'date': pubDate,
          'title': figure.title
        };

        $rootScope.fullFigureMap.$add(mapEntry);

        //close modal
        $rootScope.modalInstance.close();
      });
    };

    $rootScope.addFlask = function () {
      //Check if user is logged in, if not return login alert
      if (!$rootScope.auth.user) {
        $rootScope.addAlert('info','Log In to be able to flask figures.');
        return;
      } else {
        var flasks = $rootScope.selectedItem.mapRef.$child('flasks');
        flasks.$add($rootScope.auth.user.email);

        //notify client that this figure has been flasked
        $rootScope.selectedItem.userFlasked = true;
      }
    };

    $rootScope.selectGraphItem = function (item) {
      $rootScope.selectedGraphItem = item;
    };

    $rootScope.select2Options = {
      'multiple': true,
      'simple_tags': true,
      'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
    };
  });

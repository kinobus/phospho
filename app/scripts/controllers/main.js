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
        $rootScope.selectedItem = angular.copy(selection);
        $rootScope.selectedItem.mutable = true;
        $rootScope.selectedItem.tags = ['tag1', 'tag2']
      } else {
        $rootScope.selectedItem = selection;
        var mapKey = $rootScope.selectedItem.mapKey;
        $rootScope.selectedItem.mapRef = PhosphoIO.fbSync('map/' + mapKey, 1);
      }
      $scope.open();
    };



    //Construct list of figures using a figureMap
    $scope.loadFigures = function (figureMap) {
      $scope.figures = [];
      angular.forEach(figureMap, function(value, key){

        //need to put this here to filter out firebase functions that get added to the ref
        if (angular.isObject(value)) {
          var graph = PhosphoIO.fbSync('figures/' + value.figureKey + '/graph', 2);
          
          //build list of flasks and check if user has flasked this figure yet
          var flasks = [];
          var userFlasked = false;
          angular.forEach(value.flasks, function (value) { 
            flasks.push(value);
            if (value === $rootScope.auth.user.email) {
              userFlasked = true;
            }
          });


          $scope.figures.push({
            'graph': graph,
            'mapKey': key,
            'author': value.author,
            'type': 'pathway',
            'title': value.title,
            'flaskCount': flasks.length,
            'userFlasked': userFlasked
          });
        }
        $scope.figures.reverse();
      });
    };


    //load full figure map
    $scope.fullFigureMap = PhosphoIO.fbSync('map', 500);

    //initiall load every figure in the figure map
    $scope.fullFigureMap.$on('loaded', function () {
      $scope.loadFigures($scope.fullFigureMap);
    });

    //load every figure in the figure map on change
    $scope.fullFigureMap.$on('change', function () {
      $scope.loadFigures($scope.fullFigureMap);
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
      $scope.publishedFigs = PhosphoIO.fbSync('figures', 1);

      $scope.publishedFigs.$add({'graph': figure.graph}).then(function (p) {

        var pubDate = new Date().getTime();

        var mapEntry = {
          'figureKey': p.name(),
          'author': $rootScope.auth.user.email,
          'date': pubDate,
          'title': figure.title
        };

        $scope.fullFigureMap.$add(mapEntry);

        //close modal
        $scope.modalInstance.close();
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

    $rootScope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
    };

    $rootScope.displayScale = {
      'gridblock': 0.25,
      'focus': 1
    };
  });

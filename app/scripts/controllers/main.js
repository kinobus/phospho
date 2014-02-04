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
      } else {
        $rootScope.selectedItem = selection;
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
          $scope.figures.push({
            'graph': graph,
            'mapKey': key,
            'author': value.author,
            'type': 'pathway',
            'title': value.title
          });
        }
      });
    };


    //load full figure map
    $scope.fullFigureMap = PhosphoIO.fbSync('map', 500);
    console.log($scope.fullFigureMap);

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
      $rootScope.mutableSelection = true;
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

      $rootScope.addFlask = function () {

      };



      //Check if what is being published is a fork, if so give credit to parent figure
      //if ($rootScope.parentFigure) {
        //add username onto forklist
      //}

      //Switch 'edit mode' to off (for grid view)
      //$rootScope.mutableSelection = false;

      //set initial level of flasks and forks (necessary?)
      //snapshot.flasks = 0;
      //snapshot.forks = 0;

      //set publication date
      //var d = new Date();
      //snapshot.pubDate = d.getTime();


      //check again whether user is logged in... seems unnecessary
      //if ($rootScope.auth.user) {

        //set author name
        //snapshot.author = $rootScope.auth.user.email;

        //add the figure data to the figures endpoint
        //var newFigureRef = $scope.figures.$add()
        //newFigureRef.$set

        //$scope.figures.$add(snapshot);

        //$scope.justAddedKey = snapshot.name();


        //grab the index key for the figure that was just added
        //$scope.justAddedKey = $scope.figures.$getIndex()[-1]

        //add an entry to start tracking flasks for this figure
        //$scope.flasks.$add({

        //});

        //close modal
        //$scope.modalInstance.close();
      //} else {
        //$rootScope.addAlert('danger','For some reason, your figure was not published.');
      //}
      //$rootScope.selectedItem = null;
    };

    $rootScope.displayScale = {
      'gridblock': 0.25,
      'focus': 1
    };
  });

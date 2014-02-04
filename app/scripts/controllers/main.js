'use strict';

angular.module('phosphoBaseApp')
  .controller('MainCtrl', function ($scope, $rootScope, PhosphoIO, figureFactory, $modal) {

    $scope.newPathway = new figureFactory.pathway();

    $scope.openFiguremodal = function () {
      $rootScope.alerts = [];
      $rootScope.modalInstance = $modal.open({
        templateUrl: 'views/figure-modal.html',
        controller: 'FiguremodalCtrl'
      });
    };

    $scope.selectGridblock = function (selection, mutable) {

      if (mutable) {
        $rootScope.selectedItem = angular.copy(selection);
        $rootScope.selectedItem.mutable = true;
        $rootScope.selectedItem.tags = ['tag1', 'tag2'];
      } else {
        $rootScope.selectedItem = selection;
        var mapKey = $rootScope.selectedItem.mapKey;
        $rootScope.selectedItem.mapRef = PhosphoIO.fbSync('map/' + mapKey, 1);
      }
      $scope.openFiguremodal();
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
    $rootScope.fullFigureMap = PhosphoIO.fbSync('map', 500);

    //initiall load every figure in the figure map
    $rootScope.fullFigureMap.$on('loaded', function () {
      $scope.loadFigures($rootScope.fullFigureMap);
    });

    //load every figure in the figure map on change
    $rootScope.fullFigureMap.$on('change', function () {
      $scope.loadFigures($rootScope.fullFigureMap);
    });
  });

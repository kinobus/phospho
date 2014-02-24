'use strict';

angular.module('phosphoBaseApp')
  .controller('MainCtrl', function ($scope, $rootScope, PhosphoIO, figureFactory, $modal) {

    //Process a selected gridblock
    //and then open it in a modal window
    $scope.selectFigure = function (selection, newFigure) {

      //TODO make newFigure into its own function
      if (newFigure) {
        $rootScope.selectedFigure = new figureFactory.pathway();
        $rootScope.selectedFigure.mutable = true;
      } else {
        $rootScope.selectedFigure = selection;
        var mapKey = $rootScope.selectedFigure.mapKey;
        $rootScope.selectedFigure.mapRef = PhosphoIO.fbSync('map/' + mapKey, 1);
      }

      //TODO make this back into its own function
      //open figure modal
      $rootScope.modalInstance = $modal.open({
        templateUrl: 'views/figure-modal.html',
        controller: 'FiguremodalCtrl'
      });
    };


    //Load specified figures from the resource
    //and place them on the grid
    $scope.loadFigures = function (resourceMap) {
      $scope.figures = [];
      angular.forEach(resourceMap, function(value, key){

        //need to put this here to filter out firebase functions that get added to the ref
        if (angular.isObject(value)) {
          var graph = PhosphoIO.fbSync('figures/' + value.figureKey + '/graph', 2);
          
          //build list of flasks and check if user has flasked this figure yet
          var flasks = [];
          var userFlasked = false;
          angular.forEach(value.flasks, function (value) {
            flasks.push(value);
            if ($rootScope.auth.user) {
              if (value === $rootScope.auth.user.email) {
                userFlasked = true;
              }
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

    //Generate statistics about a specified items in the resource
    $scope.crunchStats = function (resourceMap) {
      //map reduce all the tags
      var taglist = _(resourceMap).pluck('tags');
      //var tagGroups = _.groupBy(taglist, )
      console.log(taglist);
    };

    $scope.fbStrip = function (fbResource) {
      var resourceMap = _.reject(fbResource, function (value) {return _.isFunction(value); });
      return resourceMap;
    };

    //load a map describing everything figure in the resource
    //should include: figures, authors, flasks, tags
    $rootScope.globalResource = PhosphoIO.fbSync('map', 500);

    //On initial page-load, populate the grid with the 15 most recent figures
    $rootScope.globalResource.$on('loaded', function () {

      //Make a copy without firebase functions
      $rootScope.globalResourceMap = $scope.fbStrip($rootScope.globalResource);

      //TODO make this load only the first 15
      $scope.loadFigures($rootScope.globalResourceMap);
      $scope.crunchStats($rootScope.globalResourceMap);
    });

    //Watch the globalResourceMap, 
    //and every time a figure is added, load it to the grid
    $rootScope.globalResource.$on('change', function () {

      //$rootScope.globalResourceMap = $scope.fbStrip($rootScope.globalResource);
      //$scope.loadFigures($rootScope.globalResourceMap);
      //$scope.crunchStats($rootScope.globalResourceMap);
    });
  });

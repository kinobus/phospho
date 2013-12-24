'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope, Buildkinome, $firebase) {

    //$scope.testitems = $firebase(new Firebase('https://phospho2.firebaseio.com/testitems'));
    //$scope.item = $scope.testitems[0]

    $scope.interactomes = $firebase(new Firebase('https://phospho.firebaseio.com/interactomes'));

    $scope.ms2datasets = $firebase(new Firebase('https://phospho.firebaseio.com/ms2datasets'));

    $scope.change = function() {
      //escape if required values are null
      if (!$scope.dataset) {
        return;
      }
      if (!$scope.interactome) {
        return;
      }
      var ms2data = $scope.dataset.data;
      var links = $scope.interactome.links;


      var ms2linkedNested = _.map(ms2data, function (datapoint) {
        var linkedObjects = _.where(links, {substrate: datapoint.gene});
        _.map(linkedObjects, function (linkedObject) {
          return _.extend(linkedObject, {mean: datapoint.mean});
        });
        return linkedObjects;
      });
      var ms2linked = _.flatten(ms2linkedNested);
      //console.log(ms2linked);

      var initkinome = new Buildkinome.build();
      var kinome = _.map(initkinome, function (thiskinase) {
        var meanObjects = _.where(ms2linked, {kinase: thiskinase});
        var means = _.pluck(meanObjects, 'mean');
        var reducedMeans = _.reduce(means, function(memo, num){ return memo * num; }, 1);
        return {gene: thiskinase, activity: reducedMeans};
      });

      var kinomeFilt = _.filter(kinome, function(kinase){ return kinase.activity  !== 1; });
      $scope.kinomeFilt = kinomeFilt;
    };
  });

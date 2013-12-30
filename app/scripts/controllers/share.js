'use strict';

angular.module('phosphoApp')
  .controller('ShareCtrl', function ($scope, Buildkinome, loginService, $firebase) {

    $scope.logout = function() {
      loginService.logout()
      $location.path('/');
    };

    $scope.kinomeScale = 0.125; //hard coded for now, note that koRender directive needs this

    $scope.interactomes = $firebase(new Firebase('https://phospho.firebaseio.com/interactomes'));

    $scope.ms2datasets = $firebase(new Firebase('https://phospho.firebaseio.com/ms2datasets'));

    $scope.kinomes = $firebase(new Firebase('https://phospho.firebaseio.com/kinomes'));

    $scope.shareKinome = function () {
      $scope.kinomes.$add({
        kinome: $scope.kinome,
        dataset: $scope.dataset.title,
        interactome: $scope.interactome.title,
        user: $scope.auth.user.id
      });
    };

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

      var initkinome = new Buildkinome.build();
      var kinome = _.map(initkinome, function (thiskinase) {
        var meanObjects = _.where(ms2linked, {kinase: thiskinase});
        var means = _.pluck(meanObjects, 'mean');
        var reducedMeans = _.reduce(means, function(memo, num){ return memo * num; }, 1);
        return {gene: thiskinase, activity: reducedMeans};
      });

      var kinomeFilt = _.filter(kinome, function(kinase){ return kinase.activity  !== 1; });
      $scope.kinome = kinomeFilt;
    };
  });
/* global _ */
'use strict';

angular.module('phosphoApp')
  .controller('BuildFigureCtrl', function ($scope, allKinases) {

    //function for getting a pathway
    //TODO make this part of service/factory, combine functionality w what is happening in drawPathway
    $scope.getPathway = function (title) {
      $scope.pathway = $scope.user.collection.pathways.pathways[title];

      //bind data right away
      $scope.bindData();
    };

    $scope.getInteractome = function (title) {
      $scope.interactome = $scope.fb('/interactomes/interactomes/' + title);

      //bind data right away
      $scope.bindData();
    };

    //function for binding data to pathway or kinome
    $scope.bindData = function () {

      //bind data to nodes in pathway graph
      if ($scope.figureType === 'pathway') {
        _.map($scope.pathway.graph.nodes, function (node) {
          var nodeData = _.findWhere($scope.dataset.data, {gene: node.label});
          if (nodeData) {
            var newObj = {mean: nodeData.mean};
            return _.extend(node, newObj);
          }
        });
      }

      //bind dataset to kinases in kinome
      if ($scope.figureType === 'kinome') {
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

        var initkinome = allKinases;
        var kinome = _.map(initkinome, function (thiskinase) {
          var meanObjects = _.where(ms2linked, {kinase: thiskinase});
          var means = _.pluck(meanObjects, 'mean');
          var reducedMeans = _.reduce(means, function(memo, num){ return memo * num; }, 1);
          return {gene: thiskinase, activity: reducedMeans};
        });

        var kinomeFilt = _.filter(kinome, function(kinase){ return kinase.activity  !== 1; });
        $scope.kinome = kinomeFilt;
      }
    };

    //initialize new figure title
    $scope.newTitle = 'Untitled Figure';

    //initialize dataset
    $scope.dataset = $scope.user.collection.datasets[0];

    //intitialize figureType
    $scope.figureType = 'pathway';

    //initialize with first pathway in list
    $scope.pathwayTitle = $scope.user.collection.pathways.titles[0];
    $scope.getPathway($scope.pathwayTitle);

    //Get kinase-substrate interactome titles from firebase
    $scope.interactomeTitles = $scope.fb('/interactomes/titles');

    //Get first interactome right away
    $scope.interactomeTitle = $scope.interactomeTitles[0];
    $scope.interactome = $scope.getInteractome($scope.interactomeTitle);
  });

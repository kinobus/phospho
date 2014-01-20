/* global _ */
'use strict';

angular.module('phosphoApp')
  .controller('BuildFigureCtrl', function ($scope) {

    //function for getting a pathway
    //TODO make this part of service/factory, combine functionality w what is happening in drawPathway
    $scope.getPathway = function (title) {
      $scope.pathway = $scope.user.collection.pathways.pathways[title];
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
        //do something
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

    //bind data right away
    $scope.bindData();
  });

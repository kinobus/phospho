'use strict';

angular.module('phosphoApp')
  .controller('DrawPathwayCtrl', function ($scope) {

    $scope.clearSelection = function () {
      $scope.selectedItem = null;
    };

    $scope.selectItem = function (item) {
      $scope.$apply(function() {
        $scope.selectedItem = item;
      });
    };

    $scope.deleteItem = function (item) {
      if (item.type === 'node') {
        $scope.spliceNode(item.graphItem);
      } else if (item.type === 'link') {
        $scope.spliceLink(item.graphItem);
      }
      $scope.clearSelection();
    };

    $scope.spliceNode = function (node) {
      $scope.pathway.graph.nodes.splice($scope.pathway.graph.nodes.indexOf(node), 1);
      $scope.spliceLinksForNode(node);
    };

    $scope.spliceLinksForNode = function (node) {
      var toSplice = $scope.pathway.graph.links.filter(function(l) {
        return (l.source === node || l.target === node);
      });
      toSplice.map(function(l) {
        $scope.pathway.graph.links.splice($scope.pathway.graph.links.indexOf(l), 1);
      });
    };

    $scope.selectLink = function (item) {
      $scope.$apply(function () {
        $scope.selectedLink = item;
      });
    };

    $scope.spliceLink = function (link) {
      $scope.pathway.graph.links.splice($scope.pathway.graph.links.indexOf(link), 1);
      $scope.clearSelection();
    };

    $scope.newNode = function () {
      var lastNode = $scope.pathway.graph.nodes[$scope.pathway.graph.nodes.length - 1];
      var newNode = {
        'id': lastNode.id + 1,
        'label': 'New Node',
        'type': 'prot',
        'compartment': 'cytosol'
      };
      $scope.pathway.graph.nodes.push(newNode);
    };

    //TODO fix this!
    $scope.newLink = function (source, target) {
      var newLink = {
        'source': source,
        'target': target,
        'type': 'activate'
      };
      $scope.pathway.graph.links.push(newLink);
    };

    //function to get pathway
    $scope.getPathway = function (title) {
      $scope.pathway = $scope.user.collection.pathways.pathways[title];
    };

    $scope.savePathway = function () {
      $scope.user.collection.pathways.titles.push($scope.newPathwayTitle);
      $scope.user.collection.pathways.pathways.push($scope.pathway);
    };

    //initialize new pathway title
    $scope.newPathwayTitle = 'Untitled Pathway';

  });

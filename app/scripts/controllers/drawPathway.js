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
        'source': source.id,
        'target': target.id,
        'type': 'activate'
      };
      $scope.pathway.graph.links.push(newLink);
    };

    //TODO make this part of a service or place it in the main controller
    //function to get pathway
    $scope.getTemplate = function (title) {
      $scope.pathway = angular.copy($scope.user.collection.templates.templates[title]);
    };

    $scope.save = function () {
      //save as a template

      //save as a pathway
      $scope.user.collection.pathways.titles.push($scope.newTitle);
      $scope.user.collection.pathways.pathways[$scope.newTitle] = $scope.pathway;
    };

    //initialize new pathway title
    $scope.newTitle = 'Untitled Pathway';

    //initialize with first template in list
    $scope.templateTitle = $scope.user.collection.templates.titles[0];
    $scope.getTemplate($scope.templateTitle);

  });

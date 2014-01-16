'use strict';

angular.module('phosphoApp')
  .controller('GraphCtrl', function ($scope) {

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
      $scope.pathwayTemplate.graph.nodes.splice($scope.pathwayTemplate.graph.nodes.indexOf(node), 1);
      $scope.spliceLinksForNode(node);
    };

    $scope.spliceLinksForNode = function (node) {
      var toSplice = $scope.pathwayTemplate.graph.links.filter(function(l) {
        return (l.source === node || l.target === node);
      });
      toSplice.map(function(l) {
        $scope.pathwayTemplate.graph.links.splice($scope.pathwayTemplate.graph.links.indexOf(l), 1);
      });
    };

    $scope.selectLink = function (item) {
      $scope.$apply(function () {
        $scope.selectedLink = item;
      });
    };

    $scope.spliceLink = function (link) {
      $scope.pathwayTemplate.graph.links.splice($scope.pathwayTemplate.graph.links.indexOf(link), 1);
      $scope.clearSelection();
    };

    $scope.newNode = function () {
      var lastNode = $scope.pathwayTemplate.graph.nodes[$scope.pathwayTemplate.graph.nodes.length - 1]
      var newNode = {
        "id": lastNode.id + 1,
        "label": "New Node",
        "type": "prot",
        "compartment": "cytosol"
      }
      $scope.pathwayTemplate.graph.nodes.push(newNode);
    }

    $scope.newLink = function (source, target) {
      var newLink = {
        "source": source,
        "target": target,
        "type": "activate"
      };
      $scope.pathwayTemplate.graph.links.push(newLink);
    }

  });

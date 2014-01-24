/* global d3 */
'use strict';

angular.module('phosphoElementsApp')
  .controller('PathwayCtrl', function ($scope, demoPathway) {
    
    //set default options if none are already set
    if (!$scope.options) {
      $scope.options = {
        'width':640,
        'height':480
      };
    }

    var tick = function () {
      //boundaries
      angular.forEach($scope.graph.nodes, function (node) {
        //horizontal
        if (node.x > $scope.options.width -60) {
          node.x = $scope.options.width -60;
        } else if (node.x < 60) {
          node.x = 60;
        }

        //vertical, based on compartment
        if (node.compartment === 'membrane') {
          node.y = 50;
        } else if (node.compartment === 'nucleus') {
          node.y = $scope.options.height - 50;
        } else if (node.compartment === 'cytosol') {
          if (node.y > $scope.options.height - 101) {
            node.y = $scope.options.height - 101;
          } else if (node.y < 101) {
            node.y = 101;
          }
        }
      });

      //apply changes so that pathway directive updates
      $scope.$apply();
    };

    //load demo pathway
    $scope.graph = demoPathway.graph;

    $scope.force = d3.layout.force()
      .size([$scope.options.width , $scope.options.height])
      .gravity(0.1)
      .charge(-500)
      .linkDistance(150)
      .on('tick', tick)
      .nodes($scope.graph.nodes)
      .links([])
      .start();

    $scope.force.drag();

    //$scope.drawNodes();


  });

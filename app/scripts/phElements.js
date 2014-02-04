/* global d3 */
/* global _ */

'use strict';

angular.module('ph.Elements', [])
  .controller('PathwayCtrl', function ($scope) {

    $scope.width = 640;
    $scope.height = 480;

    $scope.BoundingboxNodes = function () {
      //boundaries
      angular.forEach($scope.graph.nodes, function (node) {
        //horizontal
        if (node.x > $scope.width -60) {
          node.x = $scope.width -60;
        } else if (node.x < 60) {
          node.x = 60;
        }

        //vertical, based on compartment
        if (node.compartment === 'membrane') {
          node.y = 50;
        } else if (node.compartment === 'nucleus') {
          node.y = $scope.height - 50;
        } else if (node.compartment === 'cytosol') {
          if (node.y > $scope.height - 101) {
            node.y = $scope.height - 101;
          } else if (node.y < 101) {
            node.y = 101;
          }
        }
      });
    };

    var tick = function () {

      //TODO, consider moving this call to the MoveNodes function
      $scope.BoundingboxNodes();

      //apply changes so that pathway directive updates
      $scope.$apply();
    };

    $scope.startForce = function () {
      var force = d3.layout.force()
        .size([$scope.width , $scope.height])
        .gravity(0.1)
        .charge(-500)
        .linkDistance(150)
        .on('tick', tick)
        .nodes($scope.graph.nodes)
        .links([])
        .start();

      var dragstart = function (d) {
        d3.select(this).classed('fixed', d.fixed = true);
      };

      $scope.drag = force.drag()
        .on('dragstart', dragstart);
    };
      
    
  })
  .directive('phosPathway', function () {
    return {
      template: '<div></div>',
      restrict: 'A',
      controller: 'PathwayCtrl',
      scope: {
        graph: '=',
        scale: '=',
        mutable: '=',
        options: '=',
        selectItem: '&'
      },
      link: function postLink(scope, element) {
        var scale = scope.scale;

        //insert SVG element
        var svg = d3.select(element[0])
            .append('svg')
            .attr('width', scope.width * scale)
            .attr('height', scope.height * scale);

        var defs = svg.append('svg:defs');

        defs.append('svg:marker')
          .attr('id', 'activate-arrow')
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', 6)
          .attr('markerWidth', 3)
          .attr('markerHeight', 3)
          .attr('orient', 'auto')
          .append('svg:path')
          .attr('d', 'M0,-5L10,0L0,5')
          .attr('fill', '#00FF00');

        defs.append('svg:marker')
          .attr('id', 'inhibit-arrow')
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', 6)
          .attr('markerWidth', 3)
          .attr('markerHeight', 3)
          .attr('orient', 'auto')
          .append('svg:path')
          .attr('d', 'M0,-5L10,0L0,5')
          .attr('fill', '#FF0000');

        defs.append('svg:path')
          .attr('id', 'prot-node')
          .attr('d','M24.5,18.5 L96.5,18.5 C103.127,18.5 108.5,23.873 108.5,30.5 L108.5,42.5 C108.5,49.127 103.127,54.5 96.5,54.5 L24.5,54.5 C17.873,54.5 12.5,49.127 12.5,42.5 L12.5,30.5 C12.5,23.873 17.873,18.5 24.5,18.5 z')
          .attr('fill','#F3B73E')
          .attr('stroke', '#000')
          .attr('stroke-width', '3px');

        defs.append('svg:path')
          .attr('id', 'event-node')
          .attr('d','M0.5,12.5 L120.5,12.5 L120.5,60.5 L0.5,60.5 z')
          .attr('fill','#2AFFFF')
          .attr('stroke', '#000')
          .attr('stroke-width', '3px');

        defs.append('svg:path')
          .attr('id', 'pathway-node')
          .attr('d','M0.5,12.5 L120.5,12.5 L120.5,60.5 L0.5,60.5 z')
          .attr('fill','#55FF6D')
          .attr('stroke', '#000')
          .attr('stroke-width', '3px');

        var gradient = defs.append('svg:linearGradient')
          .attr('id', 'gradient')
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '0%')
          .attr('y2', '100%')
          .attr('spreadMethod', 'pad');

        gradient.append('svg:stop')
          .attr('offset', '0%')
          .attr('stop-color', '#3F91A3')
          .attr('stop-opacity', 1);

        gradient.append('svg:stop')
          .attr('offset', '10%')
          .attr('stop-color', '#6A6A6A')
          .attr('stop-opacity', 1);

        gradient.append('svg:stop')
          .attr('offset', '90%')
          .attr('stop-color', '#6A6A6A')
          .attr('stop-opacity', 1);

        gradient.append('svg:stop')
          .attr('offset', '100%')
          .attr('stop-color', '#FF2A85')
          .attr('stop-opacity', 1);

        scope.dblclickNode = function (d) {
          return scope.selectItem({item:
            {graphItem: d, type: 'node'}
          });
        };

        scope.dblclickLink = function (d) {
          return scope.selectItem({item:
            {graphItem: d, type: 'link'}
          });
        };

        scope.drawNodes = function () {
          scope.node = svg.selectAll('.node')
            .data(scope.graph.nodes)
            .enter()
            .append('svg:g')
            .attr('class','node')
            .attr('transform', function (d) {
              return 'translate(' + ((d.x - 60) * scale) + ',' + ((d.y - 36) * scale) + ')';
            });

          scope.node.append('use')
            .attr('xlink:href',function(d) { return '#' + d.type + '-node'; })
            .attr('transform', function() { return 'scale(' + scale +')'; });

          scope.node.append('svg:text')
            .attr('x', 60 * scale)
            .attr('y', 42 * scale)
            .attr('font-family', 'HelveticaNeue-Bold')
            .attr('font-size', 18 * scale)
            .attr('text-anchor', 'middle')
            .text(function(d) { return d.label; });

          scope.node.on('dblclick', scope.dblclickNode);

          if (scope.mutable) {
            scope.node.call(scope.drag);
          }
          
        };

        scope.drawLinks = function () {
          scope.link = svg.selectAll('.link')
            .data(scope.graph.links)
            .enter()
            .append('svg:g')
            .attr('class','link')
            .append('svg:path');


          scope.link.attr('class', function(d) { return d.type; })
            .style('marker-end', function(d) { return 'url(#' + d.type + '-arrow)'; });

          scope.link.style('stroke-width', '4px')
            .style('stroke', function(d) {
              if (d.type === 'activate') {
                return '#00FF00';
              }
              else if (d.type === 'inhibit') {
                return '#FF0000';
              }
            })
            .attr('transform', function() { return 'scale(' + scale +')'; });

          scope.link.on('dblclick', scope.dblclickLink);
        };

        scope.moveNodes = function () {

          scope.node.attr('transform', function (d) {
            return 'translate(' + ((d.x - 60) * scale) + ',' + ((d.y - 36) * scale) + ')';
          });

          scope.link.attr('d', function (d) {
            var sourceNode = _.findWhere(scope.graph.nodes, {'id': d.source}),
                targetNode = _.findWhere(scope.graph.nodes, {'id': d.target}),
                sourceX = sourceNode.x,
                sourceY = sourceNode.y,
                targetX = targetNode.x,
                targetY = targetNode.y;

            return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
          });
        };

        //if scope is mutable, fire up the force layout
        if (scope.mutable) {
          scope.startForce();
        }

        //function to strip coordinates from node object list
        var omitCoords = function (nodeList) {
          var nodeListCoordless = _.map(nodeList, function(node){
            var nodeCoordless = _.omit(node, ['x','px','y','py']);
            return nodeCoordless;
          });

          return nodeListCoordless;
        };

        //watch graph and redraw whenever it changes
        scope.$watch('graph', function(newVal, oldVal) {

          //return if undefined
          if (!scope.graph.nodes) {
            return;
          }

          if (_.isEqual(newVal, oldVal)) {

            //console.log('nothing changed');
            scope.drawLinks();
            scope.drawNodes();
            scope.moveNodes();
            return;
          }

          var newNodesCoordless = omitCoords(newVal.nodes);
          var oldNodesCoordless = omitCoords(oldVal.nodes);


          if (!_.isEqual(newNodesCoordless, oldNodesCoordless)) {

            //console.log('something other than the coordinates changed');
            svg.selectAll('.node').remove();
            svg.selectAll('.link').remove();
            scope.BoundingboxNodes();

            // //if scope is mutable, fire up the force layout
            // if (scope.mutable) {
            //   scope.startForce();
            // }

            scope.drawLinks();
            scope.drawNodes();
            scope.moveNodes();
          } else {

            //console.log('coordinates changed');
            scope.moveNodes();
          }
          
        }, true);
      }
    };
  });
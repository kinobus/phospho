/* global d3 */
/* global _ */
'use strict';

angular.module('phosphoElementsApp')
  .directive('phosPathway', function () {
    return {
      template: '<div></div>',
      restrict: 'A',
      controller: 'PathwayCtrl',
      scope: {
        graph: '=',
        selectItem: '&'
      },
      link: function postLink(scope, element) {
        var scale = 1;

        //insert SVG element
        var svg = d3.select(element[0])
            .append('svg')
            .attr('width', scope.options.width)
            .attr('height', scope.options.height);

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
          .attr('stroke-width', '3px')
          .attr('transform', function() { return 'scale(' + scale +')'; });

        defs.append('svg:path')
          .attr('id', 'event-node')
          .attr('d','M0.5,12.5 L120.5,12.5 L120.5,60.5 L0.5,60.5 z')
          .attr('fill','#2AFFFF')
          .attr('stroke', '#000')
          .attr('stroke-width', '3px')
          .attr('transform', function() { return 'scale(' + scale +')'; });

        defs.append('svg:path')
          .attr('id', 'pathway-node')
          .attr('d','M0.5,12.5 L120.5,12.5 L120.5,60.5 L0.5,60.5 z')
          .attr('fill','#55FF6D')
          .attr('stroke', '#000')
          .attr('stroke-width', '3px')
          .attr('transform', function() { return 'scale(' + scale +')'; });

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

        scope.drawNodes = function () {
          scope.node = svg.append('svg:g')
            .selectAll('g')
            .data(scope.graph.nodes)
            .enter()
            .append('svg:g')
            .attr('class','node');

          scope.node.append('use')
            .attr('xlink:href',function(d) { return '#' + d.type + '-node'; });

          scope.node.append('svg:text')
            .attr('x', 60 * scale)
            .attr('y', 42 * scale)
            .attr('font-family', 'HelveticaNeue-Bold')
            .attr('font-size', 18 * scale)
            .attr('text-anchor', 'middle')
            .text(function(d) { return d.label; });

          scope.node.call(scope.force.drag);
        };

        scope.drawLinks = function () {
          scope.link = svg.append('svg:g')
            .selectAll('path')
            .data(scope.graph.links)
            .enter()
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

        //draw nodes right away
        scope.drawLinks();
        scope.drawNodes();
        scope.moveNodes();

        //watch nodes and call modeNodes whenever they move
        scope.$watch('graph', function () {
          scope.moveNodes();
        }, true);
      }
    };
  });

/* global d3 */
'use strict';

angular.module('phosphoApp')
  .directive('phPathwayEdit', function () {
    //constants
    var width = 514,
      height = 600;

    return {
      restrict: 'E',
      scope: { // attributes bound to the scope of the directive
        graph: '=',
        scaler: '=',
        selectItem: '&'
      },
      link: function postLink(scope, element) {

        var scale = scope.scaler;

        var svg = d3.select(element[0])
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        scope.$watch('graph', function (newVal) {

          svg.selectAll('*').remove();

          if (!newVal) {
            return;
          }

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

          //draw background
          svg.append('svg:rect')
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'url(#gradient)');

          function dragstart (d) {
            /*jshint validthis:true */
            d3.select(this).classed('fixed', d.fixed = true);
          }

          function dblclickNode (d) {
            return scope.selectItem({item:
              {graphItem: d, type: 'node'}
            });
          }

          function dblclickPath (d) {
            return scope.selectItem({item:
              {graphItem: d, type: 'link'}
            });
          }

          var nodes = newVal.nodes,
            links = newVal.links;

          var force = d3.layout.force()
            .size([width , height])
            .gravity(0.1)
            .charge(-500)
            .linkDistance(150);

          force.drag()
            .on('dragstart', dragstart);

          var path = svg.append('svg:g')
            .selectAll('path')
            .data(links)
            .enter()
            .append('svg:path');

          path.attr('class', function(d) { return d.type; })
            .style('marker-end', function(d) { return 'url(#' + d.type + '-arrow)'; });

          path.style('stroke-width', '4px')
            .style('stroke', function(d) {
              if (d.type === 'activate') {
                return '#00FF00';
              }
              else if (d.type === 'inhibit') {
                return '#FF0000';
              }
            })
            .style('cursor', 'pointer');

          path.on('dblclick', dblclickPath);

          var node = svg.append('svg:g')
            .selectAll('g')
            .data(nodes)
            .enter()
            .append('svg:g');

          node.append('use')
            .attr('xlink:href',function(d) { return '#' + d.type + '-node'; });

          node.style('cursor', 'pointer');

          node.append('svg:text')
            .attr('x', 60)
            .attr('y', 42)
            .attr('font-family', 'HelveticaNeue-Bold')
            .attr('font-size', '18px')
            .attr('text-anchor', 'middle')
            .text(function(d) { return d.label; });

          node.on('dblclick', dblclickNode)
            .call(force.drag);
            
          function tick() {

            //horizontal boundaries
            node.attr('x', function (d) {
                d.x = Math.max(60, Math.min(width - 64, d.x));
                return d.x;
              });

            //vertical boundaries (based on node compartment)
            node.attr('y', function (d) {
                if (d.compartment === 'membrane') {
                  d.y = 50;
                } else if (d.compartment === 'nucleus') {
                  d.y = height - 50;
                } else if (d.compartment === 'cytosol') {
                  d.y = Math.max(86, Math.min(height - 86, d.y));
                } else {
                  d.y = Math.max(36, Math.min(height - 36, d.y));
                }
                return d.y;
              });

            //update node positions
            node.attr('transform', function (d) {
                return 'translate(' + (d.x - 60) + ',' + (d.y - 36) + ')';
              });

            //update link positions
            path.attr('d', function(d) {
              var deltaX = d.target.x - d.source.x,
                  deltaY = d.target.y - d.source.y,
                  dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                  normX = deltaX / dist,
                  normY = deltaY / dist,
                  sourcePadding = 0,
                  targetPadding = 60,
                  sourceX = d.source.x + (sourcePadding * normX),
                  sourceY = d.source.y + (sourcePadding * normY),
                  targetX = d.target.x - (targetPadding * normX),
                  targetY = d.target.y - (targetPadding * normY);
              return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
            });
          }

          force.on('tick', tick)
            .nodes(nodes)
            .links(links)
            .start();

        }, true);
      }
    };
  });

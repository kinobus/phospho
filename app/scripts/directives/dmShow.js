'use strict';

angular.module('phosphoApp')
  .directive('dmShow', function () {
    //constants
    var width = 516,
      height = 600;

    return {
      restrict: 'E',
      scope: { // attributes bound to the scope of the directive
        graph: '=',
        scaler: '=',
        dataset: '=',
        selectNode: '&',
        selectPath: '&'
      },
      link: function postLink(scope, element, attrs) {

        var scale = scope.scaler;

        var svg = d3.select(element[0])
            .append('svg')
            .attr('width', width * scale)
            .attr('height', height * scale);

        //consider changing to shallow watch instead of deep watch
        scope.$watch('graph', function (newGraph, oldGraph) {
          return scope.renderGraph(newGraph, scope.dataset);
        }, true);

        //consider changing to shallow watch instead of deep watch
        scope.$watch('dataset', function (newDataset, oldDataset) {
          return scope.renderGraph(scope.graph, newDataset);
        }, true);

        scope.renderGraph = function (graph, dataset) {

          svg.selectAll('*').remove();

          if (!graph || !dataset) {
            return;
          }

          //TODO
          //bind ptms from dataset onto graph.nodes
          _.map(graph.nodes, function (node) {
            var nodeData = _.findWhere(dataset.data, {gene: node.label});
            if (nodeData) {
              var newObj = {mean: nodeData.mean};
              return _.extend(node, newObj);
            }
          });

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

          var colorScale = d3.scale.quantize()
            .domain([0, 10])
            .range(['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#ffffbf','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837']);

          //draw background
          svg.append('svg:rect')
            .attr('width', width * scale)
            .attr('height', height * scale)
            .style('fill', 'url(#gradient)');

          var nodes = graph.nodes,
            links = graph.links;

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
            .attr('transform', function() { return 'scale(' + scale +')'; });

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

          path.on('dblclick', dblclickPath);

          var node = svg.append('svg:g')
            .selectAll('g')
            .data(nodes)
            .enter()
            .append('svg:g');

          node.append('use')
            .attr('xlink:href',function(d) { return '#' + d.type + '-node'; });

          node.append('svg:text')
            .attr('x', 60 * scale)
            .attr('y', 42 * scale)
            .attr('font-family', 'HelveticaNeue-Bold')
            .attr('font-size', 18 * scale)
            .attr('text-anchor', 'middle')
            .text(function(d) { return d.label; });

          //TODO (hint: check how circles are drawn in koRender)
          //draw ptms as circles on each node

          //select nodes to draw ptms on
          var ptmNode = node.filter(function(d) { return d.mean; });

          ptmNode.append('svg:circle')
            .attr('cx', 12 * scale)
            .attr('cy', 12 * scale)
            .attr('r', 12 * scale)
            .attr('class', 'kinase')
            .attr('fill', function(d) {return colorScale(d.mean); })
            .style('stroke', 'black')
            .style('stroke-width', '3px');

          node.on('dblclick', dblclickNode);

          node.attr('transform', function (d) {
                return 'translate(' + ((d.x - 60) * scale) + ',' + ((d.y - 36) * scale) + ')';
              });

          function dblclickNode (d) {
            return scope.selectNode({item: d});
          }

          function dblclickPath (d) {
            return scope.selectPath({item: d});
          }

        };
      }
    };
  });


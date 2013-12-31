'use strict';

angular.module('phosphoApp')
  .directive('dmEdit', function () {
    //constants
    var width = 600,
      height = 600;

    return {
      restrict: 'E',
      scope: { // attributes bound to the scope of the directive
        val: '=',
        scaler: '='
      },
      link: function postLink(scope, element, attrs) {

        var svg = d3.select(element[0])
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        scope.$watch('val', function (newVal, oldVal) {

          svg.selectAll('*').remove();

          if (!newVal) {
            return;
          }

          svg.append('svg:defs').append('svg:marker')
              .attr('id', 'activate-arrow')
              .attr('viewBox', '0 -5 10 10')
              .attr('refX', 6)
              .attr('markerWidth', 3)
              .attr('markerHeight', 3)
              .attr('orient', 'auto')
            .append('svg:path')
              .attr('d', 'M0,-5L10,0L0,5')
              .attr('fill', '#00FF00');

          svg.append('svg:defs').append('svg:marker')
              .attr('id', 'inhibit-arrow')
              .attr('viewBox', '0 -5 10 10')
              .attr('refX', 6)
              .attr('markerWidth', 3)
              .attr('markerHeight', 3)
              .attr('orient', 'auto')
            .append('svg:path')
              .attr('d', 'M0,-5L10,0L0,5')
              .attr('fill', '#FF0000');

          svg.append('svg:defs').append('svg:path')
              .attr('id', 'prot-node')
              .attr('d','M24.5,18.5 L96.5,18.5 C103.127,18.5 108.5,23.873 108.5,30.5 L108.5,42.5 C108.5,49.127 103.127,54.5 96.5,54.5 L24.5,54.5 C17.873,54.5 12.5,49.127 12.5,42.5 L12.5,30.5 C12.5,23.873 17.873,18.5 24.5,18.5 z')
              .attr('fill','#F3B73E')
              .attr('stroke', '#000')
              .attr('stroke-width', '2px');

          svg.append('svg:defs').append('svg:path')
              .attr('id', 'event-node')
              .attr('d','M0.5,12.5 L120.5,12.5 L120.5,60.5 L0.5,60.5 z')
              .attr('fill','#B5D5C6')
              .attr('stroke', '#000')
              .attr('stroke-width', '2px');

          svg.append('svg:defs').append('svg:path')
              .attr('id', 'pathway-node')
              .attr('d','M0.5,12.5 L120.5,12.5 L120.5,60.5 L0.5,60.5 z')
              .attr('fill','#DE3265')
              .attr('stroke', '#000')
              .attr('stroke-width', '2px');

          var nodes = newVal.nodes,
            links = newVal.links;

          var force = d3.layout.force()
            .size([width , height])
            .charge(-820)
            .linkDistance(120)
            .on('tick', tick)
            .nodes(nodes)
            .links(links)
            .start();

          var drag = force.drag()
            .on('dragstart', dragstart);

          var path = svg.append('svg:g')
            .selectAll('path')
            .data(links)
            .enter()
            .append('svg:path')
            .attr('class', function(d) { return d.type; })
            .style('marker-end', function(d) { return 'url(#' + d.type + '-arrow)'; });

          var node = svg.append('svg:g')
            .selectAll('g')
            .data(nodes);

          var g = node.enter()
            .append('svg:g');

          g.append('use')
            .attr('xlink:href',function(d) { return '#' + d.type + '-node'; });

          g.append('svg:text')
            .attr('x', 60)
            .attr('y', 42)
            .attr('font-family', 'sans-serif')
            .attr('font-size', '18px')
            .attr('text-anchor', 'middle')
            .text(function(d) { return d.label; });

          g.call(force.drag);
            
          function tick() {
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

            node.attr('transform', function (d) {
                  return 'translate(' + (d.x - 60) + ',' + (d.y - 36) + ')';
                });

            //nodeLabels.attr('x', function(d) {return d.x;} )
                //.attr('y', function(d) { return d.y + 6;});
          }

          function dragstart (d) {
            d3.select(this).classed('fixed', d.fixed = true);
          }

        });
      }
    };
  });

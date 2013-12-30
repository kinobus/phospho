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

          var nodes = newVal.nodes,
            links = newVal.links;
          console.log(links);
          var force = d3.layout.force()
            .size([width , height])
            .charge(-820)
            .linkDistance(120)
            .on('tick', tick)
            .nodes(nodes)
            .links(links)
            .start();

          //var drag = force.drag()
            //.on('dragstart', dragstart);

          var link = svg.selectAll('.link')
            .data(links)
            .enter()
            .append('line')
            .attr('class','link')
            .attr('stroke', '#000')
            .attr('stroke-width', '1.5px');

          var node = svg.selectAll('.node')
            .data(nodes)
            .enter()
            .append('path')
            .attr('class','node')
            .attr('d','M24.5,18.5 L96.5,18.5 C103.127,18.5 108.5,23.873 108.5,30.5 L108.5,42.5 C108.5,49.127 103.127,54.5 96.5,54.5 L24.5,54.5 C17.873,54.5 12.5,49.127 12.5,42.5 L12.5,30.5 C12.5,23.873 17.873,18.5 24.5,18.5 z')
            .attr('fill','#F3B73E')
            .attr('stroke', '#000')
            .attr('stroke-width', '1.5px');
            //.call(drag);

          var nodeLabels = svg.selectAll('node')
            .data(nodes)
            .enter()
            .append('text')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '18px')
            .attr('text-anchor', 'middle')
            .text(function (d) {
              return d.Label;
            });

          function tick() {
            link.attr('x1', function(d) { return d.source.x + 60; })
                .attr('y1', function(d) { return d.source.y + 36; })
                .attr('x2', function(d) { return d.target.x + 60; })
                .attr('y2', function(d) { return d.target.y + 36; });

            node.attr('transform', function (d) {
                  return 'translate(' + (d.x) + ',' + (d.y) + ')'; });

            nodeLabels.attr('x', function(d) {return d.x + 60;} )
                .attr('y', function(d) { return d.y + 42;});
          }

          function dragstart (d) {
            d.fixed = true;
            d3.select(this).classed('fixed', true);
          }

        });
      }
    };
  });

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

        var graph = scope.val;
        console.log(graph.nodes);

        var width = 960,
              height = 500;

        var force = d3.layout.force()
            .size([width, height])
            .charge(-400)
            .linkDistance(40)
            .on("tick", tick);

        var svg = d3.select(element[0]).append("svg")
            .attr("width", width)
            .attr("height", height);

        var link = svg.selectAll(".link"),
            node = svg.selectAll(".node");

        link = link.data(graph.links)
          .enter().append("line")
            .attr("class", "link");

        node = node.data(graph.nodes)
          .enter().append("circle")
            .attr("class", "node")
            .attr("r", 12)

        function tick() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
        }

        force.nodes(graph.nodes)
          .links(graph.links)
          .start();

        scope.$watch('val', function (newVal, oldVal) {
        });
      }
    };
  });

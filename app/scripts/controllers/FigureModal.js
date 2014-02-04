/* global _ */
'use strict';

angular.module('phosphoBaseApp')
  .controller('FiguremodalCtrl', function ($scope, $rootScope, PhosphoIO) {

    //Clear initial conditions
    $rootScope.alerts = [];
    $rootScope.selectedGraphItem = null;

    //this makes it so that the accordian group for 'edit pathway'
    //is open by default
    $rootScope.pathway = true;

    //insert an alert in the figure modal window
    $rootScope.addAlert = function(alertType, alertMsg) {
      $rootScope.alerts.push({type: alertType,msg: alertMsg});
    };

    $rootScope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $rootScope.fork = function (selection) {
      //add a fork count
      $rootScope.parentFigure = selection;
      //$scope.publishedFigs.$save();

      //make snapshot into mutable selection
      $rootScope.selectedFigure = angular.copy(selection);
      $rootScope.selectedFigure.mutable = true;
      $rootScope.selectedFigure.forks = 0;
    };

    $rootScope.publish = function (figure) {

      //Check if user is logged in, if not return login alert
      if (!$rootScope.auth.user) {
        $rootScope.addAlert('info','Log In if you\'d like to share your figure with the community.');
        return;

      //Check if user has titled figure, if not return title alert
      } else if (!figure.hasTitle) {
        $rootScope.addAlert('danger','Give this figure a brief title');
        return;
      }

      //publish figure then add metadata to figureMap
      $rootScope.publishedFigs = PhosphoIO.fbSync('figures', 1);

      $rootScope.publishedFigs.$add({'graph': figure.graph}).then(function (p) {

        var pubDate = new Date().getTime();

        var mapEntry = {
          'figureKey': p.name(),
          'author': $rootScope.auth.user.email,
          'date': pubDate,
          'title': figure.title
        };

        $rootScope.fullFigureMap.$add(mapEntry);

        //close modal
        $rootScope.modalInstance.close();
      });
    };

    $rootScope.addFlask = function () {
      //Check if user is logged in, if not return login alert
      if (!$rootScope.auth.user) {
        $rootScope.addAlert('info','Log In to be able to flask figures.');
        return;
      } else {
        var flasks = $rootScope.selectedFigure.mapRef.$child('flasks');
        flasks.$add($rootScope.auth.user.email);

        //notify client that this figure has been flasked
        $rootScope.selectedFigure.userFlasked = true;
      }
    };

    $rootScope.selectGraphItem = function (item) {
      $scope.$apply(function () {
        $rootScope.selectedGraphItem = {'type': item.type};
        //find the selected item in selectedFigure
        if (item.type === 'node') {
          $rootScope.selectedGraphItem.graphItem = _.find($rootScope.selectedFigure.graph.nodes, function (node) {
            return node.id === item.graphItem.id;
          });
        } else if (item.type === 'link') {
          $rootScope.selectedGraphItem.graphItem = _.find($rootScope.selectedFigure.graph.links, function (link) {
            return _.isEqual(link, item.graphItem);
          });
        }
      });
    };

    $rootScope.deselectGraphItem = function () {
      $rootScope.selectedGraphItem = null;
    };

    $rootScope.addNode = function () {
      //find the node with the highest ID
      var nodeIds = _.pluck($rootScope.selectedFigure.graph.nodes, 'id');
      var newNodeId = _.max(nodeIds) + 1;
      var newNode = {
        'id': newNodeId,
        'label': 'new node',
        'type': 'prot',
        'compartment': 'cytosol'
      };
      $rootScope.selectedFigure.graph.nodes.push(newNode);
    };

    $rootScope.spliceNode = function () {
      var thisNodeIndex = $rootScope.selectedFigure.graph.nodes.indexOf($rootScope.selectedGraphItem.graphItem);
      $rootScope.selectedFigure.graph.nodes.splice(thisNodeIndex, 1);
      $rootScope.spliceLinksForNode($rootScope.selectedGraphItem.graphItem.id);
    };

    $rootScope.spliceLinksForNode = function (nodeId) {
      var toSplice = $rootScope.selectedFigure.graph.links.filter(function(l) {
        return (l.source === nodeId || l.target === nodeId);
      });
      toSplice.map(function(l) {
        $rootScope.selectedFigure.graph.links.splice($rootScope.selectedFigure.graph.links.indexOf(l), 1);
      });
      $rootScope.deselectGraphItem();
    };

    $rootScope.select2Options = {
      'multiple': true,
      'simple_tags': true,
      'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
    };
  });

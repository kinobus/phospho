'use strict';

angular.module('phosphoApp')
  .controller('CurateCtrl', function ($scope, loginService, $firebase, $location) {
    $scope.logout = function() {
      loginService.logout();
      $location.path('/');
    };

    $scope.dmScale = 1;

    //$scope.interactomes = $firebase(new Firebase('https://phospho.firebaseio.com/test2'));
    //console.log($scope.interactomes);

    //using objs as a hard coded place filler for $scope.interactomes loaded from firebase... 
    //something is getting f-ed up w that
    var objs = {'interactome':{
      'nodes': [
        {
          'id':0,
          'label':'BCR',
          'type':'prot',
          'compartment':'membrane'
        },
        {
          'id':1,
          'label':'PIK3CD',
          'type':'prot',
          'compartment':'cytosol'
        },
        {
          'id':2,
          'label':'PIK3R1',
          'type':'prot',
          'compartment':'cytosol'
        },
        {
          'id':3,
          'label':'Cell Growth',
          'type':'event',
          'compartment':'nucleus'
        },
        {
          'id':4,
          'label':'LYN',
          'type':'prot',
          'compartment':'cytosol'
        },
        {
          'id':5,
          'label':'CD79',
          'type':'prot',
          'compartment':'membrane'
        },
        {
          'id':6,
          'label':'SYK',
          'type':'prot',
          'compartment':'cytosol'
        },
        {
          'id':7,
          'label':'IRAK4',
          'type':'prot',
          'compartment':'cytosol'
        },
        {
          'id':8,
          'label':'BCL6',
          'type':'prot',
          'compartment':'cytosol'
        },
        {
          'id':9,
          'label':'NFKB Path',
          'type':'pathway',
          'compartment':'cytosol'
        },
        {
          'id':10,
          'label':'Ca2+ Rel',
          'type':'event',
          'compartment':'membrane'
        },
        {
          'id':11,
          'label':'BTK',
          'type':'prot',
          'compartment':'cytosol'
        },
        {
          'id':12,
          'label':'CARD11',
          'type':'prot',
          'compartment':'cytosol'
        },
        {
          'id':13,
          'label':'JAK2',
          'type':'prot',
          'compartment':'cytosol'
        },
        {
          'id':14,
          'label':'STAT3',
          'type':'prot',
          'compartment':'cytosol'
        },
        {
          'id':15,
          'label':'Cell Survival',
          'type':'event',
          'compartment':'nucleus'
        }
      ],
      'links': [
        {
          'source':0,
          'target':1,
          'type': 'activate'
        },
        {
          'source':1,
          'target':2,
          'type': 'activate'
        },
        {
          'source':2,
          'target':3,
          'type': 'activate'
        },
        {
          'source':4,
          'target':0,
          'type': 'inhibit'
        },
        {
          'source':4,
          'target':5,
          'type': 'inhibit'
        },
        {
          'source':4,
          'target':6,
          'type': 'activate'
        },
        {
          'source':6,
          'target':11,
          'type': 'activate'
        },
        {
          'source':11,
          'target':10,
          'type': 'activate'
        },
        {
          'source':10,
          'target':12,
          'type': 'activate'
        },
        {
          'source':12,
          'target':9,
          'type': 'activate'
        },
        {
          'source':13,
          'target':14,
          'type': 'activate'
        },
        {
          'source':14,
          'target':15,
          'type': 'activate'
        },
        {
          'source':7,
          'target':9,
          'type': 'activate'
        },
        {
          'source':8,
          'target':3,
          'type': 'activate'
        },
        {
          'source':9,
          'target':15,
          'type': 'activate'
        },
        {
          'source':9,
          'target':3,
          'type': 'activate'
        }
      ],
      'metadata': {
        'user': 'Ricker',
        'title': 'DLBCL pathway'
      }
    }
  };

    $scope.interactome = objs.interactome;
    //$scope.metadata = objs.metadata; //why does this work but i can't do it from firebase??
    //$scope.interactome = $scope.interactomes.interactome;
    //console.log(objs);
    $scope.editInit = function() {
      //reset editing state
      $scope.selectedNode = null;
      $scope.selectedPath = null;
      $scope.editMode = false;

      //find the max current id, add 1 and set it to newID
      var newId = _.max($scope.interactome.nodes, function(node) {return node.id}).id + 1;

      //make list of node labels for node select elements in path edit panel
      $scope.nodeLabels = _.pluck($scope.interactome.nodes, 'label');

      //set up new elements
      $scope.newNode = {label: 'node label', type: 'prot', id: newId, compartment: 'cytosol'};
      $scope.newPath = {source: (newId - 2), target: (newId -1), type: 'activate'};
    };

    //call editInit right away
    $scope.editInit();

    $scope.updateNode = function() {
      //consider making this logic part of the form validation
      if ($scope.newNode.label) {
        $scope.selectedNode.label = $scope.newNode.label;
        $scope.selectedNode.type = $scope.newNode.type;
        $scope.selectedNode.compartment = $scope.newNode.compartment;
        $scope.editInit();
      }
    };

    $scope.updatePath = function() {
      //consider making this logic part of the form validation
      //TODO check for conflict between newPath and any existing path

      //parse sourceNodeLabel and targetNodeLabel on newPath
      $scope.newPath.source = $scope.newPath.sourceNodeLabel

      if ($scope.newPath.sourceNode !== $scope.newPath.targetNode) {

        //set selectedPath properties from newPath
        $scope.selectedPath.source = $scope.newPath.source;
        $scope.selectedPath.target = $scope.newPath.target;
        $scope.selectedPath.type = $scope.newPath.type;
        $scope.editInit();
      }
    };
    
    $scope.insertPath = function() {
      //check that there is more than one node and that newPath doesn't conflict w any existing path
      //TODO check for conflict between newPath and any existing path
      if ($scope.newPath.source > -1) {
        $scope.editInit();
        $scope.interactome.links.push($scope.newPath);
        $scope.selectedPath = $scope.newPath;
        $scope.editMode = true;
      }
    };

    $scope.insertNode = function() {
      $scope.editInit();
      $scope.interactome.nodes.push($scope.newNode);
      $scope.selectedNode = $scope.newNode;
      $scope.editMode = true;

      //update node labels list
      $scope.nodeLabels = _.pluck($scope.interactome.nodes, 'label')
    };

    $scope.spliceNode = function(node) {
      //consider making this logic part of the form validation
      if ($scope.selectedNode) {
        $scope.interactome.nodes.splice($scope.interactome.nodes.indexOf(node), 1);
        $scope.spliceLinksForNode(node);
        $scope.editInit();
      }
    };

    $scope.spliceLinksForNode = function(node) {
      var toSplice = $scope.interactome.links.filter(function(l) {
        return (l.source === node || l.target === node);
      });
      toSplice.map(function(l) {
        $scope.interactome.links.splice($scope.interactome.links.indexOf(l), 1);
      });
    };

    $scope.spliceLink = function(link) {
      $scope.interactome.links.splice($scope.interactome.links.indexOf(link), 1);
      $scope.editInit();
    };

    $scope.selectNode = function(item) {
      $scope.selectedPath = null;
      $scope.$apply(function() {
        $scope.selectedNode = item;
      });

      //consider changing this part to: $scope.newNode = $scope.selectedNode;
      $scope.newNode.label = $scope.selectedNode.label;
      $scope.newNode.type = $scope.selectedNode.type;
      $scope.newNode.id = $scope.selectedNode.id;
      $scope.newNode.compartment = $scope.selectedNode.compartment;
    };

    $scope.selectPath = function(item) {
      $scope.selectedNode = null;
      $scope.$apply(function() {
        $scope.selectedPath = item;
      });

      $scope.newPath.source = $scope.selectedPath.source;
      $scope.newPath.target = $scope.selectedPath.target;
      $scope.newPath.type = $scope.selectedPath.type;
    };

  });

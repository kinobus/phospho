'use strict';

angular.module('phosphoApp')
  .controller('CurateCtrl', function ($scope, loginService, $firebase, $location) {
    $scope.logout = function() {
      loginService.logout();
      $location.path('/');
    };

    //$scope.auth = $rootScope.auth;

    $scope.dmScale = 1;

    $scope.pathways = $firebase(new Firebase('https://phospho.firebaseio.com/pathways').limit(2));

    $scope.upload = function () {
      $scope.pathways.$add($scope.pathway);
    };

    //$scope.interactomes = $firebase(new Firebase('https://phospho.firebaseio.com/test2'));
    //console.log($scope.interactomes);

    //using objs as a hard coded place filler for $scope.interactomes loaded from firebase... 
    //something is getting f-ed up w that
    var objs = {'metadata': {
        'user': 'Ricker',
        'title': 'DLBCL pathway'
      },
      'graph': {
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
        ]
      }};



    $scope.pathway = objs;
    //$scope.metadata = objs.metadata; //why does this work but i can't do it from firebase??
    //$scope.interactome = $scope.interactomes.interactome;
    //console.log(objs);
    $scope.editInit = function() {
      //reset editing state
      $scope.selectedNode = null;
      $scope.selectedPath = null;
      $scope.editMode = false;
      $scope.insertMode = false;


      //find the max current id, add 1 and set it to newID
      var newId = _.max($scope.pathway.graph.nodes, function(node) {return node.id}).id + 1;

      //make list of node labels for node select elements in path edit panel
      $scope.nodeLabels = _.pluck($scope.pathway.graph.nodes, 'label');

      //set up new elements
      $scope.newNode = {label: 'new node', type: 'prot', id: newId, compartment: 'cytosol'};
      $scope.newPath = {type: 'activate'};
    };

    //call editInit right away
    $scope.editInit();

    $scope.updateNode = function() {
      //consider making this logic part of the form validation
      if ($scope.newNode.label) {
        $scope.selectedNode.label = $scope.newNode.label;
        $scope.selectedNode.type = $scope.newNode.type;
        $scope.selectedNode.compartment = $scope.newNode.compartment;
        if ($scope.insertMode === true) {
          //re-order object so force doesn't f-up
          $scope.pathway.graph.nodes.push($scope.selectedNode);
        }
        $scope.editInit();
      }
    };

    $scope.updatePath = function() {
      
      //TODO check for conflict between newPath and any existing path

      if ($scope.newPath.source !== $scope.newPath.target) {
        //set selectedPath properties from newPath

        $scope.selectedPath = $scope.newPath;
        if ($scope.insertMode === true) {
          $scope.pathway.graph.links.push($scope.selectedPath);
          console.log($scope.selectedPath);
        }
        $scope.editInit();
      }
    };

    //KNOWN ISSUE! THIS IS FUCKING UP D3, WHY???
    $scope.insertPath = function() {
      //TODO check for conflict between newPath and any existing path
      $scope.editInit();
      $scope.selectedPath = $scope.newPath;
      $scope.insertMode = true;
      $scope.editMode = true;
    };
    
    $scope.insertNode = function() {
      $scope.editInit();
      $scope.selectedNode = $scope.newNode;
      $scope.insertMode = true;
      $scope.editMode = true;
    };

    $scope.spliceNode = function(node) {
      //consider making this logic part of the form validation
      if ($scope.selectedNode) {
        $scope.pathway.graph.splice($scope.pathway.graph.nodes.indexOf(node), 1);
        $scope.spliceLinksForNode(node);
        $scope.editInit();
      }
    };

    $scope.spliceLinksForNode = function(node) {
      var toSplice = $scope.pathway.graph.links.filter(function(l) {
        return (l.source === node || l.target === node);
      });
      toSplice.map(function(l) {
        $scope.pathway.graph.links.splice($scope.pathway.graph.links.indexOf(l), 1);
      });
    };

    $scope.spliceLink = function(link) {
      $scope.pathway.graph.links.splice($scope.pathway.graph.links.indexOf(link), 1);
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
      $scope.newPath = $scope.selectedPath;

    };

  });

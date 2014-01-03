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
          'type':'prot'
        },
        {
          'id':1,
          'label':'PIK3CD',
          'type':'prot'
        },
        {
          'id':2,
          'label':'PIK3R1',
          'type':'prot'
        },
        {
          'id':3,
          'label':'Cell Growth',
          'type':'event'
        },
        {
          'id':4,
          'label':'LYN',
          'type':'prot'
        },
        {
          'id':5,
          'label':'CD79',
          'type':'prot'
        },
        {
          'id':6,
          'label':'SYK',
          'type':'prot'
        },
        {
          'id':7,
          'label':'IRAK4',
          'type':'prot'
        },
        {
          'id':8,
          'label':'BCL6',
          'type':'prot'
        },
        {
          'id':9,
          'label':'NFKB Path',
          'type':'pathway'
        },
        {
          'id':10,
          'label':'Ca2+ Rel',
          'type':'event'
        },
        {
          'id':11,
          'label':'BTK',
          'type':'prot'
        },
        {
          'id':12,
          'label':'CARD11',
          'type':'prot'
        },
        {
          'id':13,
          'label':'JAK2',
          'type':'prot'
        },
        {
          'id':14,
          'label':'STAT3',
          'type':'prot'
        },
        {
          'id':15,
          'label':'Cell Survival',
          'type':'event'
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

    $scope.selectedNode = null;
    $scope.selectedPath = null;
    $scope.editMode = false;

    $scope.editNode = {label: 'node label'};

    $scope.spliceNode = function(node) {
      if ($scope.selectedNode) {
        $scope.interactome.nodes.splice($scope.interactome.nodes.indexOf(node), 1);
        $scope.spliceLinksForNode(node);
        $scope.selectedNode = null;
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
      $scope.selectedPath = null;
    };

    $scope.selectNode = function(item) {
      $scope.$apply(function() {
        $scope.selectedNode = item;
        $scope.selectedPath = null;
      });
      $scope.editNode.label = $scope.selectedNode.label;
    };

    $scope.selectPath = function(item) {
      $scope.$apply(function() {
        $scope.selectedPath = item;
        $scope.selectedNode = null;
      });
    };

  });

'use strict';

angular.module('phosphoApp')
  .controller('CurateCtrl', function ($scope, loginService, $firebase, $location) {
    $scope.logout = function() {
      loginService.logout();
      $location.path('/');
    };

    $scope.dmScale = 1;

    $scope.interactomes = $firebase(new Firebase('https://phospho.firebaseio.com/test2'));
    //console.log($scope.interactomes);

    //using objs as a hard coded place filler for $scope.interactomes loaded from firebase... 
    //something is getting f-ed up w that
    var objs = {'interactome':{
      'nodes': [
        {
          'id':0,
          'label':'BCR',
          'Type':'Prot'
        },
        {
          'id':1,
          'label':'PIK3CD',
          'Type':'Prot'
        },
        {
          'id':2,
          'label':'PIK3R1',
          'Type':'Prot'
        },
        {
          'id':3,
          'label':'Cell Growth',
          'Type':'Event'
        },
        {
          'id':4,
          'label':'LYN',
          'Type':'Prot'
        },
        {
          'id':5,
          'label':'CD79',
          'Type':'Prot'
        },
        {
          'id':6,
          'label':'SYK',
          'Type':'Prot'
        },
        {
          'id':7,
          'label':'IRAK4',
          'Type':'Prot'
        },
        {
          'id':8,
          'label':'BCL6',
          'Type':'Prot'
        },
        {
          'id':9,
          'label':'NFKB Path',
          'Type':'Path'
        },
        {
          'id':10,
          'label':'Ca2+ Rel',
          'Type':'Event'
        },
        {
          'id':11,
          'label':'BTK',
          'Type':'Prot'
        },
        {
          'id':12,
          'label':'CARD11',
          'Type':'Prot'
        },
        {
          'id':13,
          'label':'JAK2',
          'Type':'Prot'
        },
        {
          'id':14,
          'label':'STAT3',
          'Type':'Prot'
        },
        {
          'id':15,
          'label':'Cell Survival',
          'Type':'Event'
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

    $scope.interactome = objs.interactome; //why does this work but i can't do it from firebase??
    //$scope.interactome = $scope.interactomes.interactome;
    //console.log(objs);

  });

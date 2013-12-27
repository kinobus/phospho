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
          'Id':0,
          'Label':'BCR',
          'Type':'Prot'
        },
        {
          'Id':1,
          'Label':'PIK3CD',
          'Type':'Prot'
        },
        {
          'Id':2,
          'Label':'PIK3R1',
          'Type':'Prot'
        },
        {
          'Id':3,
          'Label':'Cell Growth',
          'Type':'Event'
        },
        {
          'Id':4,
          'Label':'LYN',
          'Type':'Prot'
        },
        {
          'Id':5,
          'Label':'CD79',
          'Type':'Prot'
        },
        {
          'Id':6,
          'Label':'SYK',
          'Type':'Prot'
        },
        {
          'Id':7,
          'Label':'IRAK4',
          'Type':'Prot'
        },
        {
          'Id':8,
          'Label':'BCL6',
          'Type':'Prot'
        },
        {
          'Id':9,
          'Label':'NFKB Path',
          'Type':'Path'
        },
        {
          'Id':10,
          'Label':'Ca2+ Rel',
          'Type':'Event'
        },
        {
          'Id':11,
          'Label':'BTK',
          'Type':'Prot'
        },
        {
          'Id':12,
          'Label':'CARD11',
          'Type':'Prot'
        },
        {
          'Id':13,
          'Label':'JAK2',
          'Type':'Prot'
        },
        {
          'Id':14,
          'Label':'STAT3',
          'Type':'Prot'
        },
        {
          'Id':15,
          'Label':'Cell Survival',
          'Type':'Event'
        }
      ],
      'links': [
        {
          'source':0,
          'target':1,
          'Type':'activ'
        },
        {
          'source':1,
          'target':2,
          'Type':'activ'
        },
        {
          'source':2,
          'target':3,
          'Type':'activ'
        },
        {
          'source':4,
          'target':0,
          'Type':'inhib'
        },
        {
          'source':4,
          'target':5,
          'Type':'inhib'
        },
        {
          'source':4,
          'target':6,
          'Type':'activ'
        },
        {
          'source':6,
          'target':11,
          'Type':'activ'
        },
        {
          'source':11,
          'target':10,
          'Type':'activ'
        },
        {
          'source':10,
          'target':12,
          'Type':'activ'
        },
        {
          'source':12,
          'target':9,
          'Type':'activ'
        },
        {
          'source':13,
          'target':14,
          'Type':'activ'
        },
        {
          'source':14,
          'target':15,
          'Type':'activ'
        },
        {
          'source':7,
          'target':9,
          'Type':'activ'
        },
        {
          'source':8,
          'target':3,
          'Type':'activ'
        },
        {
          'source':9,
          'target':15,
          'Type':'activ'
        },
        {
          'source':9,
          'target':3,
          'Type':'activ'
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

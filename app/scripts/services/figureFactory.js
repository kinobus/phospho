'use strict';

angular.module('phosphoBaseApp')
  .factory('figureFactory', function () {
    // Service logic
    // ...

    var newPathwayTemplate = {
      'isImmutable': false,
      'title': 'Untitled Figure',
      'type': 'pathway',
      'flasks': 0,
      'forks': 0,
      'graph':{
        'nodes':[
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
        'links':[
          {
            'source':0,
            'target':1,
            'type':'activate'
          },
          {
            'source':1,
            'target':2,
            'type':'activate'
          },
          {
            'source':2,
            'target':3,
            'type':'activate'
          },
          {
            'source':4,
            'target':0,
            'type':'inhibit'
          },
          {
            'source':4,
            'target':5,
            'type':'inhibit'
          },
          {
            'source':4,
            'target':6,
            'type':'activate'
          },
          {
            'source':6,
            'target':11,
            'type':'activate'
          },
          {
            'source':11,
            'target':10,
            'type':'activate'
          },
          {
            'source':10,
            'target':12,
            'type':'activate'
          },
          {
            'source':12,
            'target':9,
            'type':'activate'
          },
          {
            'source':13,
            'target':14,
            'type':'activate'
          },
          {
            'source':14,
            'target':15,
            'type':'activate'
          },
          {
            'source':7,
            'target':9,
            'type':'activate'
          },
          {
            'source':8,
            'target':3,
            'type':'activate'
          },
          {
            'source':9,
            'target':15,
            'type':'activate'
          },
          {
            'source':9,
            'target':3,
            'type':'activate'
          }
        ]
      }
    };

    // Public API here
    return {
      pathway: function () {
        return newPathwayTemplate;
      }
    };
  });

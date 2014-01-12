'use strict';

angular.module('phosphoApp')
  .factory('itemFactory', function () {
    // Service logic
    // ...

    var itemModels = {
      'map': {
        'outputs': [
          'ksInteractome',
          'pathMap'
        ]
      },
      'data': {
        'inputs': [
          'dataSource'
        ],
        'outputs': [
          'protData',
          'genoData'
        ]
      },
      'pathway': {
        'graph': {
          'node': [
            'prot',
            'pathway',
            'event'
          ],
          'link': [
            'activate',
            'inhibit'
          ],
          'compartment': [
            'membrane',
            'nucles',
            'cytosol'
          ]
        },
        'inputs': [
          'pathMap',
          'protData',
          'genoData'
        ],
        'outputs': [
          'graphSnapshot'
        ]
      },
      'kinome': {
        'graph': {
          'node': [
            'kinase'
          ],
          'compartment': [
            'kinaseFamily'
          ]
        },
        'inputs': [
          'ksInteractome',
          'protData',
          'genoData'
        ],
        'outputs': [
          'kinomeSnapshot'
        ]
      }
    };

    // Public API here
    return {
      getItems: function () {
        return itemModels;
      }
    };
  });

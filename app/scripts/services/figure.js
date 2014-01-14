'use strict';

angular.module('phosphoApp')
  .factory('figure', function () {
    // Service logic
    // ...

    var figureModels = [{
      'pathway': {
        'title': 'Cell Signaling Pathway',
        'directive': 'ph-pathway'
      },
      'kinome': {
        'title': 'Kinome Snapshot',
        'directiveName': 'ph-kinome',
        'inputs': [
          'scaler',
          'kinomeData'
        ]
      }
    }];

    // Public API here
    return {
      getFigureModels: function () {
        return figureModels;
      }
    };
  });

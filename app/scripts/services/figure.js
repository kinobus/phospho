'use strict';

angular.module('phosphoApp')
  .factory('figure', function () {
    // Service logic
    // ...

    var figureModels = [{
      'pathway': {
        'title': 'Cell Signaling Pathway', 'directive': 'ph-pathway'
      },
      'kinome': {
        'title': 'Kinome Snapshot', 'directive': 'ph-kinome'
      }
    }];

    // Public API here
    return {
      getFigureModels: function () {
        return figureModels;
      }
    };
  });

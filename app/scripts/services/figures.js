'use strict';

angular.module('phosphoApp')
  .constant('figures', [
    {
      'label': 'pathway',
      'title': 'Cell Signaling Pathway',
      'directive': 'ph-pathway'
    },{
      'label': 'kinome',
      'title': 'Kinome Snapshot',
      'directiveName': 'ph-kinome',
      'inputs': [
        'scaler',
        'kinomeData'
      ]
    }
  ]);

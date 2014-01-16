'use strict';

angular.module('phosphoApp')
  .constant('dashboards', [
    {
      'dashId': 'drawPathway',
      'title': 'Pathway',
      'icon': 'hammer',
      'headerText': 'Draw a cell signaling pathway that you are interested in.'
    },
    {
      'dashId': 'buildFigure',
      'title': 'Figure',
      'icon': 'image_add',
      'headerText':'Build a figure out of data-panels.'
    },{
      'dashId':'browseFigures',
      'title': 'Browse',
      'icon': 'binoculars',
      'headerText':'Take a look at the figures people have shared.'
    },{
      'dashId':'searchFigures',
      'title': 'Search',
      'icon': 'cloud_zoom',
      'headerText':'Search through the figures that people have shared.'
    }
  ]);

'use strict';

angular.module('phosphoApp')
  .constant('dashboards', [
    {
      'dashId': 'uploadData',
      'title': 'Upload',
      'icon': 'curriculum_add',
      'headerText': 'Upload some data so that you can use it to build a figure.'
    },
    {
      'dashId': 'buildFigure',
      'title': 'Create',
      'icon': 'hammer',
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

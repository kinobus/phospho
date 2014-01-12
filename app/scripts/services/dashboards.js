'use strict';

angular.module('phosphoApp')
  .factory('dashboards', function () {
    // Service logic
    // ...

    var dashboardList = [
      {
        'id':'uploadData',
        'title':'Upload',
        'icon': 'curriculum_add',
        'headerText':'Upload some data so that you can use it to build a figure.',
        'panels': [
          {'upload': ['dataTypeSelector','fileUpload']},
          {'myRecentUploads': ['objectPanel']}
        ]
      },
      {
        'id': 'buildFigure',
        'title': 'Create',
        'icon': 'hammer',
        'headerText':'Build a figure out of data-panels.',
        'panels': [{
          'id': 'saveFigure',
          'title': 'Save Figure',
          'icon': 'cloud_diskette'
        },{
          'id': 'newFigure',
          'icon':'brushes',
          'title':'Untitled Figure',
          'titleButtons':[{'id':'growkWidth','icon':'image_right'},{'id':'shrinkWidth','icon':'image_left'}]
        }]
      },
      {
        'id':'browseFigures',
        'title': 'Browse',
        'icon': 'binoculars',
        'headerText':'Take a look at the figures people have shared.',
        'panels': ['data','figure','legend','collection']
      },
      {
        'id':'searchFigures',
        'title': 'Search',
        'icon': 'cloud_zoom',
        'headerText':'Search through the figures that people have shared.',
        'panels': ['data','figure','legend','collection']
      }
    ];

    // Public API here
    return {
      getDashboards: function () {
        return dashboardList;
      }
    };
  });

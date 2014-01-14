'use strict';

angular.module('phosphoApp')
  .factory('dashboards', function () {
    // Service logic
    // ...

    var dashboardList = [
      {
        'dashId':'uploadData',
        'title':'Upload',
        'icon': 'curriculum_add',
        'headerText':'Upload some data so that you can use it to build a figure.',
        'panels': [
          {'upload': ['dataTypeSelector','fileUpload']},
          {'myRecentUploads': ['objectPanel']}
        ]
      },
      {
        'dashId': 'buildFigure',
        'title': 'Create',
        'icon': 'hammer',
        'headerText':'Build a figure out of data-panels.',
        'panels': [{
          'panelId':'figureTypePicker',
          'title': 'Choose Figure Type',
          'icon': 'cloud_diskette',
          'cols': 'col-xs-12 col-sm-8 col-md-4 col-lg-4',
          'body': [{
            'type': 'select',
            'model': 'figureModel'
          }]
        },{
          'panelId': 'dataPicker',
          'title': 'Choose Data to Plot',
          'icon': 'cloud_diskette',
          'cols': 'col-xs-12 col-sm-4 col-md-3 col-lg-4',
          'body': [{
            'type': 'select',
            'model': 'userData'
          }]
        },{
          'panelId': 'saveFigure',
          'title': 'Save',
          'icon': 'cloud_diskette',
          'cols': 'col-xs-12 col-sm-4 col-md-2 col-lg-2',
          'body': [{
          }]
        },{
          'panelId': 'newFigure',
          'icon':'brushes',
          'title':'Untitled',
          'cols': 'col-xs-12 col-sm-8 col-md-9 col-lg-10',
          'body': [{
            'type': 'graphDirective',
            'directiveName':'ph-graph',
            'figureType':'figureModel',
            'data':'userData'
          }]
        }]
      },{
        'dashId':'browseFigures',
        'title': 'Browse',
        'icon': 'binoculars',
        'headerText':'Take a look at the figures people have shared.',
        'panels': ['data','figure','legend','collection']
      },{
        'dashId':'searchFigures',
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

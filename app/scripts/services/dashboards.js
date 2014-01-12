'use strict';

angular.module('phosphoApp')
  .factory('dashboards', function () {
    // Service logic
    // ...

    var dashboardList = [
      {
        'id':'uploadData',
        'title':'Upload',
        'icon': 'add',
        'panels': [
          'upload',
          'myRecentUploads'
        ]
      },
      {
        'id': 'buildFigure',
        'title': 'Create',
        'icon': 'hammer',
        'panels': ['dataTypeFilterPanel']
      },
      {
        'id':'browseFigures',
        'title': 'Browse',
        'icon': 'binoculars',
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

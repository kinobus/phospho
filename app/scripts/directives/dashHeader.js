'use strict';

angular.module('phosphoApp')
  .directive('dashHeader', function () {
    return {
      template:
      '<div></div>',
      restrict: 'A',
      scope: {
        dashboard:'='
      },
      link: function postLink(scope, element, attrs) {
        element.text(scope.dashboard.headerText);
      }
    };
  });

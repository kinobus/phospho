'use strict';

angular.module('phosphoApp')
  .directive('phGraph', function () {
    return {
      template: '<div>sup</div>',
      restrict: 'E',
      scope: {
        type: '=',
        data: '='
      },
    };
  });

'use strict';

angular.module('phosphoApp')
  .directive('koRender', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the koRender directive');
      }
    };
  });

'use strict';

describe('Directive: pathway', function () {

  // load the directive's module
  beforeEach(module('phosphoElementsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('expect children to not be null', inject(function ($compile) {
    element = angular.element('<div pathway></div>');
    element = $compile(element)(scope);
    expect(element.children()).not.toBe(null);
  }));
});

'use strict';

describe('Directive: dashHeader', function () {

  // load the directive's module
  beforeEach(module('phosphoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dash-header></dash-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dashHeader directive');
  }));
});

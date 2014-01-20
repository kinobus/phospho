'use strict';

describe('Directive: phKinome', function () {

  // load the directive's module
  beforeEach(module('phosphoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ph-kinome></ph-kinome>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the phKinome directive');
  }));
});

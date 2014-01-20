'use strict';

describe('Directive: phDrawPathway', function () {

  // load the directive's module
  beforeEach(module('phosphoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ph-draw-pathway></ph-draw-pathway>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the phDrawPathway directive');
  }));
});

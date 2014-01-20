'use strict';

describe('Controller: DrawPathwayCtrl', function () {

  // load the controller's module
  beforeEach(module('phosphoApp'));

  var DrawPathwayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DrawPathwayCtrl = $controller('DrawPathwayCtrl', {
      $scope: scope
    });
  }));

  it('should initialize new pathway title', function () {
    expect(scope.newPathwayTitle).toBe('Untitled Pathway');
  });
});

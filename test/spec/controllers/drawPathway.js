'use strict';

describe('Controller: DrawPathwayCtrl', function () {

  // load the controller's module
  beforeEach(module('phosphoApp'));

  var GraphCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DrawPathwayCtrl = $controller('DrawPathwayCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

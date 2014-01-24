'use strict';

describe('Controller: PathwayCtrl', function () {

  // load the controller's module
  beforeEach(module('phosphoElementsApp'));

  var PathwayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PathwayCtrl = $controller('PathwayCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of opions to the scope', function () {
    expect(scope.options).toBeDefined();
  });
});

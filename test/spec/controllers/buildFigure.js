'use strict';

describe('Controller: BuildFigureCtrl', function () {

  // load the controller's module
  beforeEach(module('phosphoApp'));

  var BuildfigureCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BuildfigureCtrl = $controller('BuildfigureCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

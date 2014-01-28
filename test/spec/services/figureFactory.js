'use strict';

describe('Service: Figurefactory', function () {

  // load the service's module
  beforeEach(module('phosphoBaseApp'));

  // instantiate service
  var Figurefactory;
  beforeEach(inject(function (_Figurefactory_) {
    Figurefactory = _Figurefactory_;
  }));

  it('should do something', function () {
    expect(!!Figurefactory).toBe(true);
  });

});

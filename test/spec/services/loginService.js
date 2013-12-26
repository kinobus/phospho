'use strict';

describe('Service: Loginservice', function () {

  // load the service's module
  beforeEach(module('phosphoApp'));

  // instantiate service
  var Loginservice;
  beforeEach(inject(function (_Loginservice_) {
    Loginservice = _Loginservice_;
  }));

  it('should do something', function () {
    expect(!!Loginservice).toBe(true);
  });

});

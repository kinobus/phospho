'use strict';

describe('Service: Demodata', function () {

  // load the service's module
  beforeEach(module('phosphoApp'));

  // instantiate service
  var Demodata;
  beforeEach(inject(function (_Demodata_) {
    Demodata = _Demodata_;
  }));

  it('should do something', function () {
    expect(!!Demodata).toBe(true);
  });

});

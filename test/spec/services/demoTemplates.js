'use strict';

describe('Service: Demotemplates', function () {

  // load the service's module
  beforeEach(module('phosphoApp'));

  // instantiate service
  var Demotemplates;
  beforeEach(inject(function (_Demotemplates_) {
    Demotemplates = _Demotemplates_;
  }));

  it('should do something', function () {
    expect(!!Demotemplates).toBe(true);
  });

});

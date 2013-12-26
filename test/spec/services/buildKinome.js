'use strict';

describe('Service: Buildkinome', function () {

  // load the service's module
  beforeEach(module('phosphoApp'));

  // instantiate service
  var Buildkinome;
  beforeEach(inject(function (_Buildkinome_) {
    Buildkinome = _Buildkinome_;
  }));

  it('should do something', function () {
    expect(!!Buildkinome).toBe(true);
  });

});

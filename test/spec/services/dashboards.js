'use strict';

describe('Service: Dashboards', function () {

  // load the service's module
  beforeEach(module('phosphoApp'));

  // instantiate service
  var Dashboards;
  beforeEach(inject(function (_Dashboards_) {
    Dashboards = _Dashboards_;
  }));

  it('should do something', function () {
    expect(!!Dashboards).toBe(true);
  });

});

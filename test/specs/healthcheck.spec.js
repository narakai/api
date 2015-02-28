var request = require('request');
var config = require("../config/config");

describe('[HealthCheck API] ', function () {
  describe('get', function () {
    it('should return server\'s time when request', function (done) {
      request.get(config.api + "/healthcheck", function (error, response, body) {
        var bodyObject = JSON.parse(body);
        expect(response.statusCode).toBe(200);
        expect(bodyObject.date).toBeDefined();
        done();
      });
    });
  });
});
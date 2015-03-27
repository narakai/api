var request = require('request');
var config = require("../config/config");

describe('[HealthCheck API] ', function () {
  describe('get', function () {
    it("should return server's time when request", function (done) {
      request.get({url: config.healthCheck, json: true}, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        expect(body.date).toBeDefined();
        done();
      });
    });
  });
});
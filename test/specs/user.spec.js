var request = require('request');
var config = require("../config/config");

describe("[User API] ", function () {
  describe("user register ", function () {
    it("should return 409 when given a username which already contained in db", function (done) {
      var postData = {
        name: "testuser",
        from: "qq",
        uuid: "12345",
        access_token: "asdf1234"
      };
      request.post(config.api + "/users", {json: postData}, function (error, response, body) {
        expect(response.statusCode).toBe(409);
        expect(body.message).toBeDefined();
        done();
      });
    });

    it("should return 400 when not given enough parameters", function (done) {
      var postData = {
        from: "qq"
      };
      request.post(config.api + "/users", {json: postData}, function (error, response, body) {
        expect(response.statusCode).toBe(400);
        expect(body[0].msg).toBeDefined();
        expect(body[1].msg).toBeDefined();
        expect(body[2].msg).toBeDefined();
        done();
      });
    });

    it("should return 201 and created user when given right request", function (done) {
      var postData = {
        name: "rightUser",
        from: "qq",
        uuid: "12345ss",
        access_token: "asdf1234"
      };

      request.post(config.api + "/users", {json: postData}, function (error, response, body) {
        expect(response.statusCode).toBe(201);
        expect(body._id).toBeDefined();
        done();
      });

    });
  });
});
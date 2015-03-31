var request = require('request');
var config = require("../config/config");

describe("[User API] ", function () {
  describe("user register ", function () {
    it("should return 400 when not given enough parameters", function (done) {
      var postData = {
      };
      request.post(config.user, {json: postData}, function (error, response, body) {
        expect(response.statusCode).toBe(400);
        expect(body[0].msg).toBeDefined();
        expect(body[1].msg).toBeDefined();
        expect(body[2].msg).toBeDefined();
        done();
      });
    });

    it("should return 201 and null name and created user when given right request", function (done) {
      request.post(config.user, {json: config.notExistingOAuthObject}, function (error, response, body) {
        expect(response.statusCode).toBe(201);
        expect(body._id).toBeDefined();
        expect(body.name).toBeNull();
        done();
      });
    });
    it("should return 201 and specific name and created user when given right request", function (done) {
      request.post(config.user, {json: config.existingOAuthObject}, function (error, response, body) {
        expect(response.statusCode).toBe(201);
        expect(body._id).toBeDefined();
        expect(body.name).toBe("命运菊");
        done();
      });
    });
  });

  describe("find user by geo ", function () {
    it("should return 400 when query is missing", function (done) {
      request.get(config.searchUserByGeo, {json: true}, function (error, response, body) {
        expect(response.statusCode).toBe(400);
        expect(body.length).toBe(6);
        done();
      });
    });
    it("should return 400 when given an invalid query", function (done) {
      request.get(config.searchUserByGeo + "?longitude=3d&latitude=fdsewfewu8f9uewf&radius=fdjsiafos888ufsd", {json: true}, function (error, response, body) {
        expect(response.statusCode).toBe(400);
        expect(body.length).toBe(3);
        done();
      });
    });
    it("should return 404 when no user found", function (done) {
      request.get(config.searchUserByGeo + "?longitude=1&latitude=1&radius=0.1", {json: true}, function (error, response, body) {
        expect(response.statusCode).toBe(404);
        expect(body.message).toBe("not found");
        done();
      });
    });
    it("should return found user when given the right coordinates and radius", function (done) {
      request.get(config.searchUserByGeo + "?longitude=30&latitude=103&radius=2", {json: true}, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        expect(body.length).toBe(2);
        done();
      });
    });
  });
});
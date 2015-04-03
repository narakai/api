var request = require('request');
var config = require("../config/config");

describe("[User API] ", function () {
  describe("user register ", function () {
    it("should return 400 when not given enough parameters", function (done) {
      var postData = {};
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

  describe("bind user name", function () {
    it("should return 400 when given wrong header", function (done) {
      var options = {
        url: config.userRegist,
        headers: {
          from: "qq"
        },
        json: {name: "tester_"}
      };
      request.put(options, function (error, response, body) {
        expect(response.statusCode).toBe(400);
        expect(body.length).toBe(2);
        expect(body[0].msg).toBe("required");
        done();
      });

    });
    it("should return 404 when given header parameter not found any user", function (done) {
      var options = {
        url: config.userRegist,
        headers: {
          from:"xx",
          open_id: "fdsa",
          access_token: "kk"
        },
        json: {name: "testuser_fdsafdsafdsafsd89fud8safu89sdmf"}
      };

      request.put(options, function (error, response, body) {
        expect(response.statusCode).toBe(404);
        expect(body.message).toBe("not found");
        done()
      });

    });

    it("should return 409 when given a name which have already bind by other", function (done) {
      var options = {
        url: config.userRegist,
        headers: config.notBindUserHeader,
        json: {name: "命运菊"}
      };
      request.put(options, function (error, response, body) {
        expect(response.statusCode).toBe(409);
        expect(body.message).toBe("conflict");
        done();
      });

    });

    it("should return 201 when bind succeed", function (done) {
      var options = {
        url: config.userRegist,
        headers: config.notBindUserHeader,
        json: {name: "tester_"}
      };
      request.put(options, function (error, response, body) {
        expect(response.statusCode).toBe(201);
        expect(body._id).toBeDefined();
        expect(body.name).toBe("tester_");
        done();
      });
    });
  });


  describe("wanted book list", function () {
    it("should create wanted book list for an user", function(done) {
      var wantedList = [{
        name: "apiTESTBoOk",
        sn: "isbn-123-234-24",
        summary: "test summary"
      }];
      request.put(config.wantedList + "?username=testuser", {json: wantedList}, function(error, response, body) {
        expect(response.statusCode).toBe(201);
        done();
      });
    })

    it("should not create wanted book list for a non-exists user", function(done) {
      request.put(config.wantedList + "?username=xxxx", {json: []}, function(error, response, body) {
        expect(response.statusCode).toBe(403);
        done();
      });
    })
  });
});
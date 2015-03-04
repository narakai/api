var request = require('request');
var config = require("../config/config");

describe('[Books API] ', function () {
  describe('create a book', function () {
    it('should return 201 and contained a book id when given a right post body', function (done) {
      var postData = {
        name: "测试书籍",
        sn: "ISBN-321312-3213-123",
        summary: ""
      };
      request.post(config.api + "/books", {json: postData}, function (error, response, body) {
        expect(response.statusCode).toBe(201);
        expect(body._id).toBeDefined();
        done();
      });
    });
    it('should return 400 and contained error message when given an invalid name', function (done) {
      var postData = {
        name: "",
        sn: "ISBN-321312-3213-123",
        summary: ""
      };
      request.post(config.api + "/books", {json: postData}, function (error, response, body) {
        expect(response.statusCode).toBe(400);
        expect(body[0].msg).toBeDefined();
        done();
      });
    });
    it('should return 400 and contained error message when given body without name', function (done) {
      var postData = {
        sn: "ISBN-321312-3213-123",
        summary: ""
      };
      request.post(config.api + "/books", {json: postData}, function (error, response, body) {
        expect(response.statusCode).toBe(400);
        expect(body[0].msg).toBeDefined();
        done();
      });
    });
  });

  describe("search book", function () {
    it("should return query result when given name to search", function (done) {
      request.get({url: config.api + "/books?name=apiTESTBoOk", json: true}, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        expect(body).toBeDefined();
        expect(body[0]).toBeDefined();
        expect(body[0].name == "apiTESTBoOk");
        done();
      });
    });
    it("should return 405 when not given any query", function (done) {
      request.get({url: config.api + "/books", json: true}, function (error, response, body) {
        expect(response.statusCode).toBe(405);
        expect(body.message).toBe("query must contain query string");
        done();
      });
    });
    it("should return 404 when given a name not exists in db", function (done) {
      request.get({url: config.api + "/books?name=f9dasjfsd", json: true}, function (error, response, body) {
        expect(response.statusCode).toBe(404);
        expect(body.message).toBe("no book found");
        done();
      });
    });
  });
});
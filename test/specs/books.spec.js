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
        expect(body.id).toBeDefined();
        done();
      });
     });
    it('should return 400 and contained error message when given an invalid name', function (done) {
      var postData = {
        name:"",
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
});
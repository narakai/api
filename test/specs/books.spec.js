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
      console.log("request" + config.api + "/books");
      request.post(config.api + "/books", {json: postData}, function (error, response, body) {
        expect(response.statusCode).toBe(201);
        expect(body.id).toBeDefined();
        done();
      });
     });
  });
});
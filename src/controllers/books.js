module.exports = function (router, Logger) {
  var Book = require("../models/book");
  var badRequestFilter = require('../badRequestFilter');
  router.route("/books")
    .post(function (req, res) {
      // check request
      req.checkBody('name', "required").notEmpty();
      badRequestFilter(req, res, function () {
        var book = new Book();
        book.name = req.body.name;
        book.sn = req.body.sn;
        book.summary = req.body.summary;
        book.save(function (error, book, count) {
          if (error) {
            res.status(500).json({msg: "internal error"});
          } else {
            res.status(201).send(book);
            Logger.info("create " + count + " book name:" + book.name);
          }
        });
      });
    });
};
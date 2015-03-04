module.exports = function (router, Logger) {
  var Book = require("../models/book");
  var badRequestFilter = require('../badRequestFilter');
  var _ = require("lodash-node");
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
    })
    .get(function (req, res) {
      if (_.map(req.query).length <= 0) {
        res.status(405).json({message: "query must contain query string"});
      } else {
        Book.find(req.query, function (error, books) {
          if (error) {
            res.status(405).json({message: "invalid query"});
          } else {
            books.length == 0 ? res.status(404).send({message:"no book found"}) : res.status(200).send(books);
          }
        });
      }
    });
};
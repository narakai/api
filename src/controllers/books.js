var Logger = require("winston");
var resOnSave = require('../resOnSave');
module.exports = function (router) {
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
        book.save(resOnSave(res))
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
            books.length == 0 ? res.status(404).send({message: "no book found"}) : res.status(200).send(books);
          }
        });
      }
    });

  router.route("/books/:_id")
    .get(function (req, res) {
      Book.findById(req.params._id, function (error, book, count) {
        if (error || count == 0) {
          res.status(404).json({message: "book not found"});
        } else {
          res.status(200).json(book);
        }
      });
    });
};

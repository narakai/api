var resOnSave = require('../resOnSave');
module.exports = function (router) {
  var Book = require("../models/book");
  var badRequestFilter = require('../badRequestFilter');
  var _ = require("lodash-node");
  var queryResultSender = require('../queryResultSender');

  router.route("/books")
    .post(function (req, res) {
      // check request
      req.checkBody('name', "required").notEmpty();
      badRequestFilter(req, res, function () {
        var book = new Book();
        book.name = req.body.name;
        book.sn = req.body.sn;
        book.summary = req.body.summary;
        book.save(resOnSave(res));
      });
    })
    .get(function (req, res) {
      if (_.map(req.query).length <= 0) {
        res.status(405).json({message: "query must contain query string"});
      } else {
        Book.find(req.query, queryResultSender.multiple(res));
      }
    });

  router.route("/books/:_id")
    .get(function (req, res) {
      Book.findById(req.params._id, queryResultSender.single(res));
    });
};

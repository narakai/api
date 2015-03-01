module.exports = function (router, Logger, models) {
  var Book = models.Book;
  var badRequestFilter = require('../badRequestFilter');
  router.route("/books")
    .post(function (req, res) {
      // check request
      req.checkBody('name', "field:name invalid").notEmpty();
      badRequestFilter(req, res, function () {
        Book.create({
          name: req.body.name,
          sn: req.body.sn,
          summary: req.body.summary
        }).then(function (book) {
          res.status(201).send(book);
        });
      });
    });
};
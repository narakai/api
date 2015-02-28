module.exports = function (router, Logger, models) {
  var Book = models.Book;
  router.route("/books")
    .post(function (req, res) {
      Book.create({
        name: req.body.name,
        sn: req.body.sn,
        summary: req.body.summary
      }).then(function (book) {
        res.status(201).send(book);
      });
    });
};
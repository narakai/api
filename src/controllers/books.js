module.exports = function (router, models) {
  router.route("/books")
    .post(function (req, res) {
      res.status(201).json({id: 321321});
    });
};
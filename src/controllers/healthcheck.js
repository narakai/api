module.exports = function (router) {
  router.get('/healthcheck', function (req, res) {
    res.status(200).json({date: Date.now()});
  })
};

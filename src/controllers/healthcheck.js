module.exports = function (route) {
  route.get('/healthcheck', function (req, res) {
    res.status(200).json({date: Date.now()});
  })
};
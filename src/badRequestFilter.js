module.exports = function (req, res, cb) {
  var validatorErrors = req.validationErrors();
  if (validatorErrors) {
    res.status(400).send(validatorErrors);
  } else {
    cb();
  }
};
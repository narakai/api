var Logger = require("winston");
module.exports = function (res, error, objects, model, cb) {
  if (error) {
    res.status(500).json({message: "nothing to say..."});
    Logger.error(error);
  } else {
    if (objects.length > 0) {
      res.status(200).send(objects);
    } else {
      res.status(404).json({message: model + " not found"});
    }
  }
  if (cb) {
    cb();
  }
};
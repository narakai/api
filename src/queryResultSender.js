var Logger = require("winston");
module.exports = {
  single: function (res) {
    return function (error, object) {
      if (error) {
        res.status(500).send({message: "nothing to say..."});
        Logger.error(error);
      } else {
        if (object) {
          res.status(200).send(object);
        } else {
          res.status(404).send({message: "not found"});
        }
      }
    };
  },
  multiple: function (res) {
    return function (error, objects) {
      if (error) {
        res.status(500).send({message: "nothing to say..."});
        Logger.error(error);
      } else {
        if (objects.length > 0) {
          res.status(200).send(objects);
        } else {
          res.status(404).send({message: "not found"});
        }
      }
    };

  }

};
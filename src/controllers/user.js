module.exports = function (router, Logger) {
  var User = require("../models/user");
  var badRequestFilter = require('../badRequestFilter');
  var _ = require("lodash-node");

  router.route("/users")
    .post(function (req, res) {
      req.checkBody('name', "required").notEmpty();
      req.checkBody('from', "required").notEmpty();
      req.checkBody('uuid', "required").notEmpty();
      req.checkBody('access_token', "required").notEmpty();
      badRequestFilter(req, res, function () {
        User.findByName(req.body.name, function (error, users) {
          if(users.length > 0){
            res.status(409).json({message: "duplicate name"});
          }else{
            var user = new User;
            user.name = req.body.name;
            user.from = req.body.from;
            user.uuid = req.body.uuid;
            user.access_token = req.body.access_token;
            user.save(function (error, user, count) {
              if(error){
                res.status(500).json({message: "internal error"});
                Logger.error(error);
              }else{
                res.status(201).send(user);
              }
            })
          }
        });
      });

    });


};
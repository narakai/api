module.exports = function (router, Logger) {
  var User = require("../models/user");
  var badRequestFilter = require('../badRequestFilter');
  var queryResultSender = require('../queryResultSender');
  var request = require('request');
  var validationUrl = "https://graph.qq.com/user/get_user_info",
    oauth_consumer_key = "1104321992";

  router.route("/users")
    .post(function (req, res) {
      req.checkBody('from', "required").notEmpty();
      req.checkBody('open_id', "required").notEmpty();
      req.checkBody('access_token', "required").notEmpty();
      badRequestFilter(req, res, function () {
        var requestUrl = ["openid=" + req.body.open_id,
          "access_token=" + req.body.access_token,
          "oauth_consumer_key=" + oauth_consumer_key].join("&");

        request.get(validationUrl + "?" + requestUrl, {json: true}, function (error, response, body) {
          if (body.ret != 0) {
            res.status(403).json({message: "unauthorized user"});
          } else {
            User.findByPlatform(req.body.from, req.body.open_id, function (error, user) {
              if (user) {
                user.access_token = req.body.access_token;
                user.save(function (error, user) {
                  if (error) {
                    res.status(500).json({message: "internal error"});
                    Logger.error(error);
                  } else {
                    res.status(201).send(user);
                  }
                });
              } else {
                var newUser = new User();
                newUser.name = req.body.name;
                newUser.from = req.body.from;
                newUser.open_id = req.body.open_id;
                newUser.location = req.body.location;
                newUser.access_token = req.body.access_token;
                newUser.save(function (error, user) {
                  if (error) {
                    res.status(500).json({message: "internal error"});
                    Logger.error(error);
                  } else {
                    res.status(201).send(user);
                  }
                });
              }
            });
          }
        });
      });
    });

  router.route("/users/geosearch")
    .get(function (req, res) {
      req.checkQuery('longitude', 'required').notEmpty();
      req.checkQuery('longitude', 'should be float').isFloat();
      req.checkQuery('latitude', 'required').notEmpty();
      req.checkQuery('latitude', 'should be float').isFloat();
      req.checkQuery('radius', 'required').notEmpty();
      req.checkQuery('radius', 'should be float').isFloat();

      var longitude = parseFloat(req.query.longitude),
        latitude = parseFloat(req.query.latitude),
        radius = parseFloat(req.query.radius);

      badRequestFilter(req, res, function () {
        User.find({
          location: {
            $near: [longitude, latitude],
            $maxDistance: radius
          }
        }).exec(function (error, users) {
          queryResultSender(res, error, users, 'user');
        });
      });
    });
};
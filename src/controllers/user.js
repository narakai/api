module.exports = function (router) {
  var User = require("../models/user");
  var badRequestFilter = require('../badRequestFilter');
  var queryResultSender = require('../queryResultSender');
  var request = require('request');
  var validationUrl = "https://graph.qq.com/user/get_user_info",
    oauth_consumer_key = "1104321992";
  var Logger = require('winston');
  var resOnSave = require("../resOnSave");

  router.route("/users")
    .post(function (req, res) {
      req.checkBody('from', "required").notEmpty();
      req.checkBody('open_id', "required").notEmpty();
      req.checkBody('access_token', "required").notEmpty();
      badRequestFilter(req, res, function () {
        saveAuthorizedUser();
      });

      function saveAuthorizedUser() {
        var requestUrl = ["openid=" + req.body.open_id,
          "access_token=" + req.body.access_token,
          "oauth_consumer_key=" + oauth_consumer_key].join("&");

        request.get(validationUrl + "?" + requestUrl, {json: true}, function (error_, response_, body) {
          if (body.ret !== 0) {
            res.status(403).send({message: "unauthorized user"});
          } else {
            saveUser();
          }
        });
      }

      function saveUser() {
        User.findByPlatform(req.body.from, req.body.open_id, function (error_, user) {
          if (user) {
            user.access_token = req.body.access_token;
            user.save(resOnSave(res));
          } else {
            var newUser = new User();
            newUser.from = req.body.from;
            newUser.open_id = req.body.open_id;
            newUser.location = req.body.location;
            newUser.access_token = req.body.access_token;
            newUser.save(resOnSave(res));
          }
        });
      }
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
        }).exec(queryResultSender.multiple(res));
      });
    });

  router.route("/users/regist")
    .put(function (req, res) {
      req.checkHeader("open_id", "required").notEmpty();
      req.checkHeader("from", "required").notEmpty();
      req.checkHeader("access_token", "required").notEmpty();
      badRequestFilter(req, res, function () {
        User.findOne({name: req.body.name}, function (error, existingUser) {
          if (!!existingUser) {
            res.status(409).send({message: "conflict"});
          } else {
            User.findOne({
              from: req.headers.from,
              access_token: req.headers.access_token,
              open_id: req.headers.open_id
            }, function (error, user) {
              if (!error) {
                if (user) {
                  user.name = req.body.name;
                  user.save(resOnSave(res));
                } else {
                  res.status(404).send({message: "not found"});
                }
              } else {
                Logger.error(error);
                res.status(500).send({message: "nothing to say"});
              }
            });
          }
        });
      });
    });

  router.route("/wantedlist")
    .put(function (req, res) {
      req.checkQuery('username', 'required').notEmpty();
      badRequestFilter(req, res, function () {
        User.findOneAndUpdate({name: req.query.username}, { $set: {wantedList: req.body}},
          {}, function (error, newOne) {
            if (error || !newOne) {
              res.status(403).send({message: 'invalid username'});
            } else {
              res.status(201).send({message: 'created wanted book list'});
            }
          });
      });

    });
};

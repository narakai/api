var databaseConnection = function (cb) {
  var mongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/yobook';
  mongoClient.connect(url, function (error, db) {
    if (error) {
      console.log(error);
    } else {
      cb(db);
    }
  });
};

module.exports.up = function () {
  databaseConnection(function (db) {
    var book = db.collection('books');
    var user = db.collection('users');

    book.insert({
      name: "apiTESTBoOk",
      sn: "isbn-123-234-24",
      summary: "test summary"
    }, function (error, result) {
    });

    user.insert({
      name: "testuser",
      from: "qq",
      open_id: "12345",
      access_token: "asdf1234",
      location: [30, 103],
      qq: 12345
    }, function (error, result) {
    });
    user.insert({
      name: "testuser_1",
      from: "qq",
      open_id: "12345",
      access_token: "asdf1234",
      location: [31, 104],
      qq: 12345
    }, function (error, result) {
    });
    user.insert({
      name: "命运菊",
      from: "qq",
      open_id: "F060E94D032970382DA473C167BBD93F",
      access_token: "fjldakfalsdf",
      location: [1, 2],
      qq: 12345
    }, function (error, result) {
    });
    user.insert({
      name: null,
      from: "qq",
      open_id: "authed_id",
      access_token: "authed_token",
      location: [1, 2],
      qq: 12345
    }, function (error, result) {
    });
    db.close();
  });
};

module.exports.down = function () {
  databaseConnection(function (db) {
    var book = db.collection('books');
    book.remove({}, function (error, result) {
    });
    var user = db.collection('users');
    user.remove({}, function (error, result) {
    });
    db.close();
  });
};
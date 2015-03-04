var databaseConnection = function (cb) {
  var mongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/yobook';
  mongoClient.connect(url, function (error, db) {
    if(error){
      console.log(error);
    }else{
      cb(db);
    }
  });
};

module.exports.up = function () {
  databaseConnection(function (db) {
    var book = db.collection('books');
    book.insert({name:"apiTESTBoOk", sn:"isbn-123-234-24",summary:"test summary"}, function (error, result) {});
    db.close();
  });
};

module.exports.down = function () {
  databaseConnection(function (db) {
    var book = db.collection('books');
    book.remove({}, function (error, result) {});
    db.close();
  });
};
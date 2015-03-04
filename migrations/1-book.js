module.exports.id = "book";

module.exports.up = function (done) {
  var collection = this.db.collection("books");
  collection.insert({name: "apiTESTBoOk", sn: "ISBN-32-f324-24", summary: "test summary"}, done);
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  },
  access_token: {
    type: String,
    required: true
  },
  qq: {
    type: String
  },
  wantedList: [],
  location: {
    type: [Number], // [longitude, latitude]
    index: '2d'
  }
});

UserSchema.static('findByName', function (name, callback) {
  return this.find({name: name}, callback);
});

module.exports = mongoose.model('User', UserSchema);
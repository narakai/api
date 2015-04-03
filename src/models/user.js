var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    default: null
  },
  from: {
    type: String,
    required: true
  },
  open_id: {
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
  return this.findOne({name: name}, callback);
});

UserSchema.static('findByPlatform', function (from, open_id, callback) {
  return this.findOne({from: from, open_id: open_id}, callback);
});

module.exports = mongoose.model('User', UserSchema);
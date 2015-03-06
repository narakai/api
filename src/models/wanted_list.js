var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WantedListSchema = new Schema({
  books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('WantedList',WantedListSchema);
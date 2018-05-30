
var mongoose = require('mongoose');

// define the schema for our event model
var calendarSchema = mongoose.Schema({
      year        : String,
      calendar    : String,
      status      : String

}, {
      timestamps: true
  });

// methods ======================

// create the model for calendar and expose it to our app
module.exports = mongoose.model('Calendar', calendarSchema);


var mongoose = require('mongoose');

// define the schema for our ad model
var adSchema = mongoose.Schema({
      owner        : String,
      content    : String,
      ad       : String,
      position       : String,
      status       : String

}, {
      timestamps: true
  });

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Ad', adSchema);

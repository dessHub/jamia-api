
var mongoose = require('mongoose');

// define the schema for our ad model
var termSchema = mongoose.Schema({
      title        : String,
      content    : String

}, {
      timestamps: true
  });

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Term', termSchema);

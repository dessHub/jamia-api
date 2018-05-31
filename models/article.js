
var mongoose = require('mongoose');

// define the schema for our event model
var articleSchema = mongoose.Schema({
      title        : String,
      content    : String,
      banner    : String,
      category        : String,
      status       : String

}, {
      timestamps: true
  });

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Article', articleSchema);

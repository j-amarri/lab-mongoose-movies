const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    deafult: 'unknown'
  },
  catchPhrase: {
    type: String,
    required: true
  }
});

// Create the model for celebrity via mongoose
const Celebrity = mongoose.model('Celebrity', celebritySchema);

// Make it accessible to other files by exporting
module.exports = Celebrity;

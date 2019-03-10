const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    authorName: {
        first: String,
        last: String
      },
    dateOfBirth: Date,
})

const authorModel = mongoose.model('author', authorSchema);

module.exports = authorModel;
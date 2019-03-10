const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    bookId:[{type:mongoose.Schema.Types.ObjectId,ref:"bookModel"}],
    userId: [{type:mongoose.Schema.Types.ObjectId,ref:"userModel"}],
    comment:'string',
})

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;
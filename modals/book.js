//this is  created with nada ITI
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName:  {type:'string',required:true},
    authorId:  {type:mongoose.Schema.Types.ObjectId,ref:'authorModel'},
    categoryId:{type:mongoose.Schema.Types.ObjectId,ref:'categoryModel'},
    totalRating:Number,
})

const bookModel = mongoose.model('book', bookSchema);
module.exports = bookModel;
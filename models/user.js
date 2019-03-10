const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        first: String,
        last: String
      },
    dOB: Date,
    email:{type:"string",required:true,match:/^\w+\@\w+\.\w{2,3}/},
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
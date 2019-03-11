const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/test7', (err) => {
    if (err) console.log(err)
    else console.log('connected to mongodb');
})

// setup User model and its fields.
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});
//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
        console.log("error")
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const User = mongoose.model('user', userSchema);


module.exports =  User;
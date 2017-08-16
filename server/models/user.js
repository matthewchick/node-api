
const mongoose = require('mongoose');
const validator = require('validator');
/*
{
  email: 'chikmatthew@gmail.com',
  password: 'ksdfi3opckvlc',
  tokens: [{

  }]
}
http://mongoosejs.com/docs/validation.html
*/

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      isAsync: false,    // fix deprecated in mongoose >= 4.9.0
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  passsword: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = {User};

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      isAsync: false, // fix deprecated in mongoose >= 4.9.0
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//control returning output
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this; //this => this user model
  var access = 'auth';
  var token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'abc123')
    .toString();
  console.log(token);

  user.tokens.push({ access, token });
  //return token;
  return user.save().then(() => {
    //Note .then as Promise in ES6
    return token;
  });
};
// set private route
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};
// add middleware
UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
/*
{
  email: 'chikmatthew@gmail.com',
  password: 'ksdfi3opckvlc',
  tokens: [{

  }]
}
http://mongoosejs.com/docs/validation.html
*/

var User = mongoose.model('User', UserSchema);

module.exports = { User };

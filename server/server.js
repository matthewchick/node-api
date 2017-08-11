
/*
create api for model, mongoose connection

*/
// deconstructing at ES6
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

/* move to db/mongoose.js
var mongoose = require('mongoose');

//Use native promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true });

// Save new something as a scheme
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});
//create an instance
/*
var newTodo = new Todo({
  text: 'Cook dinner'
});

newTodo.save().then((doc) => {
  console.log('Save todo ', doc)
}, (e) => {
  console.log('Unable to save todo')
});

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});
*/
var otherTodo = new Todo({
  text: 'This is a test',
  completed: true,
  completedAt: 123
});

otherTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save otherTodo', e);
});

var user = new User({
   email:'matthew@  '
});

user.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save user', e);
});

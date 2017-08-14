
/*
1. create api for model, mongoose connection
2. sudo npm i express@latest body-parser@latest --save
3. httpstatuses.com
4. use nodemon, expect, mocha and supertest for TDD
*/
// deconstructing at ES6
var express = require('express');
// Parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

// const is better than var
const {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    completedAt: req.body.completedAt
  })
  //console.log(req.body.text);
  //console.log(req.body.completedAt);
  todo.save().then((doc) => {
    res.send(doc);
    //console.log(doc);
    //console.log(JSON.stringify(doc, undefined, 2));
  }, (e) => {
    console.log('Unable to save todo', e);
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  // Valid id using isValid
  // 404 - send back empty send

  // findById

  Todo.findById(id).then((todo) => {
    if (!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }, (e) => {
    res.status(400).send(e);
  })
});


app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};

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
/*
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
*/

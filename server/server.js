
/*
 1. create api for model, mongoose connection - CRUD
 2. sudo npm i express@latest body-parser@latest --save
 3. httpstatuses.com
 4. use nodemon, expect, mocha and supertest for TDD
 5. create post, get, delete and patch api
 6. install lodash
 7. install validator
 8. install hashing, crypto-js => sudo npm i crypto-js@latest --save
 9. install JWT => jeremychik$ sudo npm i jsonwebtoken@latest --save
    https://jwt.io/
10. implement token and header
11. how to set private route => authenticate
*/
// deconstructing at ES6
var express = require('express');
const _ = require('lodash');
// Parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

// const is better than var
const {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

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
    //console.log('Unable to save todo', e);
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
  });
});

app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;
  //validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  //remove todo by id -> success -> error
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=> {
    res.status(400).send();
  });
});
//update
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo){
      return res.status(404).send();
    }
    res.send({todo});   //res.send({todo: todo})
  }).catch((e)=> {
    res.status(400).send();
  });
})
// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body)

  //User.findByToken
  //user.generateAuthToken
  user.save().then(() => {
    return user.generateAuthToken();
    //res.send(user);
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});
// Set the private route
/* move it to authenticate.js
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {   //.then is promise callback
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};
*/
app.get('/users/me', authenticate, (req, res) => {

  res.send(req.user);
  /*var token = req.header('x-auth');

  User.findByToken(token).then((user) => {   //.then is promise callback
    if (!user) {
      return Promise.reject();
    }
    res.send(user);
  }).catch((e) => {
    res.status(401).send();
  }); */
});

app.listen(port, () => {
  console.log(`Started on port $(port)`);
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

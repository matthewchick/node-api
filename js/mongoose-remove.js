
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

/*
Todo.remove({}).then((result) => {
  console.log(result);
})
*/
/*
Todo.findOneAndRemove('abcd').then((todo) => {
  console.log(todo);
})
*/

Todo.findByIdAndRemove('5992662371dc2c478e203d72').then((todo) => {
  console.log(todo);
});

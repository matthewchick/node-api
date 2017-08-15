
var mongoose = require('mongoose');

//Use native promises
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MongoDB_URI || 'mongodb://localhost:27017/TodoApp', { useMongoClient: true });

/*
module.exports = {
  mongoose: mongoose
};
*/
module.exports = {mongoose};

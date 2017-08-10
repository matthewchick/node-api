

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  /* Use promise .then() will run either the success or error case
  depending on if the original promise resolves or rejects.
  The error handler will not fire if the sucess case code throws an error.
  'completed: false' means one record
  */
  db.collection('Users').find({
    _id: new ObjectID('598aaa50e2d5b85bd0ffc797')
  }).toArray().then((docs) => {
    console.log('Users')
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch user', err)
  });
  db.collection('Users').find().count().then((count) => {
    console.log(`Users count: ${count}`)
  
  }, (err) => {
    console.log('Unable to fetch user', err)
  });
  /*
  db.collection('Users').find().toArray().then((docs) => {
    console.log('Users')
    console.log(JSON.stringify(docs, undefined, 2));
  }).catch(err) => {
    console.log('Unable to fetch user', err)
  });
  */

  db.close();
});

// test, production and development
// mongodb://<dbuser>:<dbpassword>@ds119044.mlab.com:19044/todoapp => to mLab.com
// username: chikmatthew
// mongo ds119044.mlab.com:19044/todoapp -u <dbuser> -p <dbpassword>

var env = process.env.NODE_ENV || 'development';

console.log('env ****', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MongoDB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MongoDB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

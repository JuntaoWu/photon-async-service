import mongoose from 'mongoose';
import util from 'util';

// config should be imported before importing any other file
import config from './server/config/config';
import app from './server/config/express';
import socketIO from 'socket.io';

const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912

app.io = socketIO(app.server);
app.io.on('connection', function listener(socket) {
  socket.on('connect', function(data){
    console.log("client connected");
  });
  socket.on('event', function(data){
    console.log("client send event");
  });
  socket.on('disconnect', function(){
    console.log("client disconnected");
  });
});

  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });

export default app;

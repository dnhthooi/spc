

var express = require('express'),
  config = require('./config/config'),
  db = require('./app/models');

var app = express();

var server = require('http').Server(app);

require('./config/express')(app, config);
require('./config/passport')(app, config);
require('./config/socket')(server, config);

db.sequelize
  .sync()
  .then(function () {
    server.listen(config.port, function () {
      console.log('Express server listening on port ' + config.port);
    });
  }).catch(function (e) {
    throw new Error(e);
  });


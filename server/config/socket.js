
var jwtAuth = require('socketio-jwt-auth');
var orm = require('../app/models');
var glob = require('glob');

module.exports = function(server, config) {
  var env = process.env.NODE_ENV || 'development';

  var io = require('socket.io')(server);

  io.use(jwtAuth.authenticate({
    secret: config.jwt.secretOrKey
  }, function(payload, done) {
    orm.User.findById(payload.id, {
      attributes: ['firstName', 'lastName', 'email', 'password']
    }).then(function(user) {
      if (user && user.password === payload.password) {
        delete user.password;
        done(null, user);
      } else {
        done(null, false);
      }
    }).catch(function(err) {
      done(err, false);
    });
  }));

  io.on('connection', function(socket) {
    console.log('Authentication passed!');
    // now you can access user info through socket.request.user
    // socket.request.user.logged_in will be set to true if the user was authenticated
    socket.emit('success', {
      user: socket.request.user
    });

    var sockets = glob.sync(config.root + '/app/sockets/*.js');
    sockets.forEach(function (s) {
      require(s)(socket);
    });

  });
  
};

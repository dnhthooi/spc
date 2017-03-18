
var jwtAuth = require('socketio-jwt-auth'),
  orm = require('../app/models');

module.exports = function(server, config) {
  var env = process.env.NODE_ENV || 'development';

  var io = require('socket.io')(server);

  io.use(jwtAuth.authenticate({
    secret: config.jwt.secretOrKey
  }, function(payload, done) {
    orm.User.findById(payload.id, {
      attributes: ['firstName', 'lastName', 'email', 'password']
    }).then(function(user) {
      debugger;
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
      message: 'success logged in!',
      user: socket.request.user
    });
  });
  
};

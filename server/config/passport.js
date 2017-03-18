var passport = require('passport'),
  orm = require('../app/models'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(app, config) {

  var opts = config.jwt;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  app.use(passport.initialize());
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    orm.User.findById(jwt_payload.id)
      .then(function(user) {
        if (user && user.password === jwt_payload.password) {
          done(null, user);
        } else {
          done(null, false);
        }
      }).catch(function(err) {
        done(err, false);
      });
  }));

}
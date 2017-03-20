var express = require('express'),
  passport = require('passport'),
  jwt = require('jwt-simple'),
  router = express.Router(),
  orm = require('../models'),
  SECRET_KEY = process.env.SECRET_KEY || 'spc-secret';

module.exports = function(app) {
  app.use('/api', router);
};

router.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(421).json({ message: 'Please pass email and password.' });
  } else {
    orm.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if (user) {
        throw 'That email address is already in use.';
      }
    }).then(function() {
      return orm.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      }).then(function(user) {
        return _setDefaultChannelsOfUser(user);
      }).then(function(user) {
        var token = jwt.encode(user.get({ plain: true }), SECRET_KEY);
        res.json({
          id: user.id,
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      });
    }).catch(function(error) {
      res.status(403).send({ message: error });
    });
  }
});

router.post('/signin', function(req, res) {
  orm.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function(user) {
    if (!user) {
      res.status(403).json({ message: 'Authentication failed. User not found.' });
    } else {
      if (req.body.password && user.comparePassword(req.body.password)) {
        var token = jwt.encode(user.get({ plain: true }), SECRET_KEY);
        res.json({
          id: user.id,
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      } else {
        res.status(403).send({ message: 'Authentication failed. Wrong password.' });
      }
    }
  });
});

function _setDefaultChannelsOfUser(user) {
  return orm.Channel.findOne({
    where: {
      name: 'general'
    }
  }).then(function(channel) {
    channel.addUser(user);
    return user;
  });
}

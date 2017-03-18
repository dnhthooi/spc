var express = require('express'),
  passport = require('passport'),
  router = express.Router(),
  orm = require('../models'),
  jwt = require('jwt-simple'),
  crypto = require('crypto'),
  SECRET_KEY = orm.config.jwt.secretOrKey;

module.exports = function(app) {
  app.use('/api', router);
};

router.get('/user', passport.authenticate('jwt', { session: false }), function(req, res) {
  orm.User.findOne({
    where: {
      email: req.user.email
    }
  }).then(function(user) {
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    });
  }).catch(function(error) {
    res.status(400).send({ message: error });
  });
});

router.post('/user', passport.authenticate('jwt', { session: false }), function(req, res) {
  orm.User.findOne({
    where: {
      email: req.user.email
    }
  }).then(function(user) {
    if (!user) {
      res.status(403).json({ message: 'Authentication failed. User not found.' });
    } else {
      var updateObj = {
        firstName: req.body.firstName || user.firstName,
        lastName: req.body.lastName || user.lastName
      };

      if (req.body.newPassword) {
        if (user.comparePassword(req.body.oldPassword)) {
          user.password = req.body.newPassword;
          user.hashPassword();
          updateObj.password = user.password;
        } else {
          return res.status(400).send({ message: 'Wrong old password' });
        }
      }

      user
        .update(updateObj)
        .then(function(user) {
          res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt
          });
        }).catch(function(error) {
          res.status(400).send({ message: error });
        });
    }
  });
});

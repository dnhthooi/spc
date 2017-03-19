var express = require('express'),
  passport = require('passport'),
  router = express.Router(),
  orm = require('../models');

module.exports = function(app) {
  app.use('/api', router);
};

router.get('/channel', passport.authenticate('jwt', { session: false }), function(req, res) {
  orm.User.findOne({
      where: {
        email: req.user.email
      }
    }).then(function(user) {
      return user.getChannels();
    })
    .then(function(channels) {
      res.json(channels);
    })
    .catch(function(err) {
      res.status(403).send(err);
    });
});

router.get('/channel/:id/message', passport.authenticate('jwt', { session: false }), function(req, res) {
  orm.User.findOne({
      where: {
        email: req.user.email
      }
    }).then(function(user) {
      return user.getChannels({
        where: {
          id: +req.params.id
        }
      });
    })
    .then(function(channels) {
      var channel = channels[0];
      return channel.getMessages();
    })
    .then(function(messages) {
      res.json(messages);
    })
    .catch(function(err) {
      res.status(403).send(err);
    });
});

router.post('/channel', passport.authenticate('jwt', { session: false }), function(req, res) {
  orm.User.findOne({
      where: {
        email: req.user.email
      }
    }).then(function(user) {
      return user.addChannel({
        name: res.body.name
      });
    })
    .then(function(channel) {
      res.json(channel);
    })
    .catch(function(err) {
      res.status(403).send(err);
    });
});

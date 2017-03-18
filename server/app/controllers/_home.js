var fs = require('fs'),
  path = require('path'),
  express = require('express'),
  router = express.Router(),
  orm = require('../models'),
  indexStatic = fs.readFileSync(path.normalize(__dirname + '/../..') + '/public/index.html')
    .toString('utf8');

module.exports = function(app) {
  app.use(express.static('public'));
  app.use('/', router);
};


router.get('/**', function(req, res, next) {
  if(req.path.indexOf('.') > -1 || req.path.indexOf('api') > -1) {
    return next();
  }
  console.log('abc');
  res.set('Content-Type', 'text/html');
  res.send(indexStatic);
});

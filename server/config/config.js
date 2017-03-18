var path = require('path'),
    sequelize = require('./sequelize'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'spc'
    },
    port: process.env.PORT || 4000,
    socketPort: process.env.PORT || 4000,
    db: sequelize['development'],
    jwt: {
      secretOrKey: process.env.SECRET_KEY || 'spc-secret'
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'labelle'
    },
    port: process.env.PORT || 3200,
    socketPort: process.env.PORT || 3200,
    db: sequelize['test'],
    jwt: {
      secretOrKey: process.env.SECRET_KEY || 'spc-secret'
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'spc'
    },
    port: process.env.PORT || 80,
    socketPort: process.env.PORT || 80,
    db: sequelize['production'],
    jwt: {
      secretOrKey: process.env.SECRET_KEY || 'spc-secret'
    }
  }
};

module.exports = config[env];

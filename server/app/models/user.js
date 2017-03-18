'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsToMany(models.Channel, { as: 'Channels', through: 'JoinChannels', foreignKey: 'userId' });
      }
    },
    instanceMethods: {
      hashPassword: function() {
        if (typeof this.password === 'string') {
          this.password = bcrypt.hashSync(this.password, 8);
        }
      },
      comparePassword: function(pw) {
        return bcrypt.compareSync(pw, this.password);
      }
    }
  });

  User.beforeCreate(function(user, options) {
    user.hashPassword();
  });

  return User;
};

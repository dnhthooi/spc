'use strict';

module.exports = function(sequelize, DataTypes) {
  var Channel = sequelize.define('Channel', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        Channel.belongsTo(models.User, { as: 'owner' });
        Channel.belongsToMany(models.User, { as: 'Users', through: 'JoinChannels', foreignKey: 'channelId' });
      }
    }
  });

  return Channel;
};

'use strict';

module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    message: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // Message.hasOne(models.User, {
        //   as: 'user',
        //   foreignKey: {
        //     name: 'userId',
        //     allowNull: false
        //   }
        // });

        // Message.hasOne(models.Channel, {
        //   as: 'channel',
        //   foreignKey: {
        //     name: 'channelId',
        //     allowNull: false
        //   }
        // });

        Message.belongsTo(models.User, { as: 'owner' });
        Message.belongsTo(models.Channel, { as: 'channel' });
      }
    }
  });

  return Message;
};

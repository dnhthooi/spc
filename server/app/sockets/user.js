var orm = require('../models');

module.exports = function(io) {

  io.on('userJoined', function() {
    _sendExistingMessages(io);
  });

  function _sendExistingMessages(socket) {
    orm.Message.findAll({
      where: {
        channelId: 1 //general channel id
      },
      raw: true
    }).then(function(messages) {
      socket.emit('messages', messages);
    });
  }

};
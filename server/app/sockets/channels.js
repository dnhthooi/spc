var orm = require('../models');

module.exports = function (io, currentUser) {
  var socketChannels = {};
  var sockets = {};
  var channels = currentUser.channels;

  channels.forEach(function (channel) {
    socketChannels[channel.name] = io.of('/' + channel.name)
      .on('connection', function (socket) {
        socket.on('message', function (message) {
          onMessageReceived(message, socket);
        });
      });
  });

  function onMessageReceived(message, senderSocket) {
    _sendAndSaveMessage(message, senderSocket);
  }

  function _sendAndSaveMessage(message, socket) {
    socket.broadcast.emit('message', message);
  }
};
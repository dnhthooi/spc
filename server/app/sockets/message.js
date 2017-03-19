var orm = require('../models');

module.exports = function(io) {

  io.on('message', function(message) {
    _sendAndSaveMessage(message, io);
  });

  function _sendAndSaveMessage(message, socket) {
    socket.broadcast.emit('message', message);
  }

};
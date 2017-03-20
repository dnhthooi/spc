import SocketIOClient from 'socket.io-client';

const socketURL = 'http://localhost:4000';

class SocketService {

  setToken(token) {
    this._token = token;
  }

  getSocket(token) {
    this._socket = SocketIOClient(socketURL, {
      query: {
        auth_token: this._token || token
      }
    });
    return this._socket;
  }

  joinChannel(channel) {
    return SocketIOClient(`${socketURL}/${channel}`, {
      query: {
        auth_token: this._token
      }
    });
  }

  disconnect() {
    this._socket && this._socket.disconnect()
  }
}

export default new SocketService();
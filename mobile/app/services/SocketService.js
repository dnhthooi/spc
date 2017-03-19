import SocketIOClient from 'socket.io-client';

const socketURL = 'http://localhost:4000';

class SocketService {

    getSocket(token) {
      this._socket = SocketIOClient(socketURL, {
        query: {
          auth_token: token
        }
      });
      return this._socket;
    }

    disconnect() {
      this._socket && this._socket.disconnect()
    }
}

export default new SocketService();
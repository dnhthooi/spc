var _ = require('lodash');

const apiURL = 'http://localhost:4000/api';

class ApiService {

  setToken(token) {
    this._token = token;
  }

  getChannels() {
    return this._get(apiURL + '/channel');
  }

  getMessagesOfChannel(channelId) {
    return this._get(apiURL + '/channel/id/message');
  }

  _post(url, creds) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._token
      },
      body: JSON.stringify(creds)
    });
  }

  _get(url) {
    console.log(url);
    debugger;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._token
      }
    });
  }
}

export default new ApiService();
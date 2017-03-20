const apiURL = 'http://localhost:4000/api';

class ApiService {

  setToken(token) {
    this._token = token;
  }

  getChannels() {
    return this._get(`${apiURL}/channel`);
  }

  getMessagesOfChannel(channelId) {
    return this._get(`${apiURL}/channel/${channelId}/message`);
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
    }).then((response) => {
      return response.json();
    });
  }

  _get(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._token
      }
    }).then((response) => {
      return response.json();
    });
  }
}

export default new ApiService();
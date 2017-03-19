var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

const authKey = 'auth';
const userKey = 'user';
const apiURL = 'http://localhost:4000/api'

class AuthService {
  getAuthInfo(){
    return new Promise((resolve, reject) => {
      
      AsyncStorage.multiGet([authKey, userKey], (err, val)=> {
        if(err){
            return reject(err);
        }

        if(!val){
            return reject();
        }

        var zippedObj = _.zipObject(val);

        if(!zippedObj[authKey]){
            return reject();
        }

        var authInfo = {
          token: zippedObj[authKey],
          user: JSON.parse(zippedObj[userKey])
        }

        return resolve(authInfo);
      });
    });
  }

  signin(creds) {
    return new Promise((resolve, reject) => {
      this._post(apiURL + '/signin', creds)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          }

          throw {
            badCredentials: response.status == 401,
            unknownError: response.status != 401
          }

        }).then((response) => {
          return response.json();
        }).then((results) => {
          AsyncStorage.multiSet([
            [authKey, results.token],
            [userKey, JSON.stringify(results)]
          ], (err) => {
            if (err) {
              throw err;
            }

            return resolve(results);
          });
        }).catch((err) => {
          return reject({unknownError: true, rawError: err});
        });
    });
  }

  signup(creds, cb) {
    this._post(apiURL + '/signup', creds)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        throw {
          badCredentials: response.status == 401,
          unknownError: response.status != 401
        }

      }).then((response) => {
        return response.json();
      }).then((results) => {

        AsyncStorage.multiSet([
          [authKey, results.token],
          [userKey, JSON.stringify(results)]
        ], (err) => {
          if (err) {
            throw err;
          }

          return cb({ success: true });
        })
      }).catch((err) => {
        return cb(err);
      });
  }

  _post(url, creds) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds)
    });
  }
}

export default new AuthService();

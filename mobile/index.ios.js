/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { 
  createStore,
  applyMiddleware
} from 'redux';

import { Provider } from 'react-redux';

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import thunk from "redux-thunk";

import App from './App';
import AuthService from './AuthService';
import reducer from './reducers';
import { debuggerDispacth } from './actions';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

function logger({ dispatch, getState }) {
  return (next) => (action) => {
    console.log(JSON.stringify(action));
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  }
}

export default class mobile extends Component {

  constructor() {
    super();
    store.dispatch(debuggerDispacth());
  }

  render() {
    return (<Provider store={store}>
      <App />
    </Provider>);
  }
}

AppRegistry.registerComponent('mobile', () => mobile);

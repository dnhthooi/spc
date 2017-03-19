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

import App from './app/App';
import reducer from './app/reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default class mobile extends Component {

  constructor() {
    super();
  }

  render() {
    return (<Provider store={store}>
      <App />
    </Provider>);
  }
}

AppRegistry.registerComponent('mobile', () => mobile);

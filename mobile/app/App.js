/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import { ApiService, SocketService } from './services';

import Register from './register/Register';
import Message from './message/Message';

import * as AppActions from './actions';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      isLoggedIn: props.isLoggedIn,
      checkingAuth: props.checkingAuth,
      currentUser: props.currentUser
    };
  }

  componentWillReceiveProps(props) {

    this.setState({
      isLoggedIn: props.isLoggedIn,
      checkingAuth: props.checkingAuth,
      currentUser: props.currentUser
    });

    if (props.isLoggedIn && props.currentUser) {
      let token = props.currentUser.token;
      ApiService.setToken(token);
      SocketService.setToken(token);
    } else {
      SocketService.disconnect();
    }
  }

  componentDidMount() {
    this.props.requestAuth();
  }

  render() {

    if (this.state.checkingAuth) {
      return (<View style={styles.container}>
        <Text style={styles.welcome}>Checking....</Text>
      </View>)
    }
    if (this.state.isLoggedIn && this.state.currentUser) {
      return (
        <View style={styles.container}>
          <Message></Message>
        </View>
      );
    }

    return (
      <Register />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  checkingAuth: state.checkingAuth,
  currentUser: state.currentUser
})

const mapDispatchToProps = {
  requestAuth: AppActions.checkingAuth
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

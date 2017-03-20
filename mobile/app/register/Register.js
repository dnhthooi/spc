'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Signin from './Signin';
import Signup from './Signup';

import * as AppActions from '../actions';

class Register extends Component {
  constructor(props) {
    super();

    this.state = {
      canDisplaySignin: props.canDisplaySignin
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      canDisplaySignin: props.canDisplaySignin
    });
  }

  render() {
    if (this.state.canDisplaySignin) {
      return (<View style={styles.container}>
        <Signin />
        <TouchableHighlight
          onPress={this.props.hideSignin}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableHighlight>
      </View>);
    }

    return (<View style={styles.container}>
      <Signup onSignup={this.onLoginSuccess} />
      <TouchableHighlight
        onPress={this.props.showSignin}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableHighlight>
    </View>);
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    paddingTop: 40,
    padding: 10,
    alignItems: 'center',
    flex: 1
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 24
  }
});

const mapStateToProps = state => ({
  canDisplaySignin: state.canDisplaySignin
});

const mapDispatchToProps = {
  showSignin: AppActions.showSignin,
  hideSignin: AppActions.hideSignin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

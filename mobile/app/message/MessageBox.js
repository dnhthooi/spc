'use strict';

import { connect } from 'react-redux';

import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';

import * as AppActions from '../actions';

class MessageBox extends Component {
  constructor(props) {
    super();

    this.state = {
      message: ''
    };
  }

  componentWillReceiveProps(props) {
    this.setState({});
  }

  render() {
    return (<View style={styles.container}>
      <View style={styles.messageInputWrapper}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          onChangeText={(text) => this.setState({ message: text })}
        />
      </View>
      <View style={styles.controlsWrapper}>
        <View style={styles.controls}>

        </View>
        <TouchableHighlight
          underlayColor={'#5fc4ee'}
          onPress={this.onSendPressed.bind(this)}
          style={styles.sendButton}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableHighlight>
      </View>
    </View>);
  }

  onSendPressed() {

  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  controlsWrapper: {
    borderTopColor: '#ccc',
    borderTopWidth: 1
  },
  controls: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1
  },
  messageInputWrapper: {
    padding: 4
  },
  messageInput: {
    height: 40
  },
  sendButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#48BBEC'
  },
  buttonText: {
    color: '#fff',
  }
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);

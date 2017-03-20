'use strict';

import { connect } from 'react-redux';

import React, { Component } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

import MessageList from './MessageList';
import MessageBox from './MessageBox';

import { SocketService } from '../services';

import * as AppActions from '../actions';

class Message extends Component {
  socketChannels = {};
  constructor(props) {
    super();

    this.state = {
      channels: props.channels,
      messages: props.messages,
      currentUser: props.currentUser,
      selectedChannel: props.selectedChannel
    };

  }

  componentWillReceiveProps(props) {
    this.setState({
      channels: props.channels,
      messages: props.messages,
      currentUser: props.currentUser,
      selectedChannel: props.selectedChannel
    });
    
    if (props.selectedChannel === -1 && props.channels.length) {  
      props.setCurrentChannel(props.channels[0]);

      let socket = SocketService.getSocket();

      socket.on('error', (err) => {
        console.log(err);
      });

      socket.on('success', (data) => {
        console.log(data);
        data.channels.forEach((channel) => {
          
          this.socketChannels[channel] = SocketService.joinChannel(channel);
          this.socketChannels[channel].on('message', (message) => {
            if(channel === this.props.selectedChannel.name) {
              this.onReceivedMessage([message]);
            }
          });
        });
      });
    }
  }

  componentDidMount() {
    this.props.getAllChannelsOfUser();
  }

  onSend(messages = []) {

    this.socketChannels[this.props.selectedChannel.name].send(messages[0]);
    this._storeMessages(messages);

  }

  render() {
    var user = { _id: this.state.currentUser.id || -1 };

    return (<View style={styles.container}>
      <GiftedChat messages={this.state.messages}
        onSend={this.onSend.bind(this)}
        user={user}
      /></View>)
  }

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  }
});

const mapStateToProps = state => ({
  channels: state.channels,
  messages: state.messages,
  currentUser: state.currentUser,
  selectedChannel: state.selectedChannel
});

const mapDispatchToProps = {
  setCurrentChannel: AppActions.setCurrentChannel,
  getAllChannelsOfUser: AppActions.getAllChannelsOfUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

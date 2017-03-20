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

      this.props.setCurrentChannel(props.channels[0].id);

      let socket = SocketService.getSocket();

      socket.on('error', function(err) {
        console.log(err);
      });

      socket.on('success', function(data) {
        console.log(data.message);
        console.log('user info: ' + data.user);
        socket.emit('userJoined', null);
      });

      socket.on('messages', function(messages) {
        console.log(messages);
      });

      socket.on('message', function(message) {
        console.log(message);
      });
    }
  }

  componentDidMount() {
    this.props.getAllChannelsOfUser();
  }

  onSend(messages = []) {
    this._storeMessages(messages);
  }

  render() {
    var user = { _id: this.state.userId || -1 };

    return ( <View style = { styles.container }>
      <GiftedChat messages = { this.state.messages }
      onSend = { this.onSend.bind(this) }
      user = { user }
      /></View>)
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

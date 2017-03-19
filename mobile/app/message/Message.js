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

import * as AppActions from '../actions';

class Message extends Component {
    constructor(props){
        super();
        
        this.state = {
          messages: [],
          userId: null
        };
    }

    componentWillReceiveProps(props) {
        this.setState({});
    }

    onSend(messages=[]) {
        this._storeMessages(messages);
    }

    render() {
        var user = { _id: this.state.userId || -1 };

        return (<View style={styles.container}>
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend.bind(this)}
                user={user}
              />
        </View>)
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
    
});

const mapDispatchToProps = {
    
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

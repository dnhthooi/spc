'use strict';

import { connect } from 'react-redux';

import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import * as AppActions from '../actions';

class MessageItem extends Component {
  constructor(props) {
    super();

    this.state = {
      message: props.message
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      message: props.message
    });
  }

  render() {
    return (<View style={styles.container}>
      <Text style={styles.ownerMessage}>{this.state.message.owner}: </Text><Text>{this.state.message.message}</Text>
    </View>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  ownerMessage: {
    fontWeight: '800'
  }
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageItem);

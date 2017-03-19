'use strict';

import { connect } from 'react-redux';

import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableHighlight
} from 'react-native';

import MessageItem from './MessageItem';

import * as AppActions from '../actions';

class MessageList extends Component {
    constructor(props){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (m1, m2) => m1.id !== m2.id});
        this.state = {
            messages: ds.cloneWithRows([{
                id: 1,
                owner: 'tamdao',
                message: 'abc'
            }])
        };
    }

    componentWillReceiveProps(props) {
        this.setState({});
    }

    render() {
        return (<View style={styles.container}>
            <ScrollView>
                <ListView
                  dataSource={this.state.messages}
                  renderRow={(message) => <MessageItem message={message}></MessageItem>}
                />
            </ScrollView>
        </View>);
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        flex: 1,
        flexGrow: 1,
        flexShrink: 1
    }
});

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = {
    
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);

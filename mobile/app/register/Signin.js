'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';

import * as AppActions from '../actions';

class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signInStatus: this.props.signInStatus
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            signInStatus: props.signInStatus
        });
    }

    render() {
        var errorCtrl = <View />;

        if(this.state.signInStatus.badCredentials){
            errorCtrl = <Text style={styles.error}>
                That email and password combination did not work
            </Text>;
        }

        if(this.state.signInStatus.unknownError){
            errorCtrl = <Text style={styles.error}>
                We experienced an unexpected issue
            </Text>;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Simple Chat App</Text>
                <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(text)=> this.setState({email: text})}
                    style={styles.siginInput}
                    placeholder="Email"></TextInput>
                <TextInput
                    onChangeText={(text)=> this.setState({password: text})}
                    style={styles.siginInput}
                    placeholder="Password" secureTextEntry="true"></TextInput>
                <TouchableHighlight
                    onPress={this.onSigninPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableHighlight>

                {errorCtrl}

            </View>
        );
    }

    onSigninPressed() {
        this.props.signIn(this.state.email, this.state.password);
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
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    siginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
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
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

const mapStateToProps = state => ({
    signInStatus: state.signInStatus
});

const mapDispatchToProps = {
    signIn: AppActions.signIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
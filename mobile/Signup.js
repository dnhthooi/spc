'use strict';

import React, { Component } from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';

import AuthService from './AuthService';

class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false
        }
    }

    render(){
        var errorCtrl = <View />;

        if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style={styles.error}>
                The email address already exists in our system
            </Text>;
        }

        if(!this.state.success && this.state.unknownError){
            errorCtrl = <Text style={styles.error}>
                We experienced an unexpected issue
            </Text>;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Simple Chat App</Text>
                <TextInput
                    onChangeText={(text)=> this.setState({firstName: text})}
                    style={styles.siginInput}
                    placeholder="First Name"></TextInput>
                <TextInput
                    onChangeText={(text)=> this.setState({lastName: text})}
                    style={styles.siginInput}
                    placeholder="Last Name"></TextInput>
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
                <TextInput
                    onChangeText={(text)=> this.setState({confirmPassword: text})}
                    style={styles.siginInput}
                    placeholder="Confirm Password" secureTextEntry="true"></TextInput>
                <TouchableHighlight
                    onPress={this.onSignupPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableHighlight>

                {errorCtrl}
            </View>
        );
    }

    onSignupPressed(){
        console.log('Attempting to log in with email ' + this.state.email);
        this.setState({showProgress: true});

        AuthService.signup({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        }, (results)=> {
            this.setState(Object.assign({
                showProgress: false
            }, results));

            if(results.success && this.props.onSignup){
                this.props.onSignup();
            }
        });
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

export default Signup;
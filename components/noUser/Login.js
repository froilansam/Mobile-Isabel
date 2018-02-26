import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, BackHandler } from 'react-native';
import axios from 'axios';
// import Signup from './Signup.js';
import { Router, Scene, Actions } from 'react-native-router-flux';
var these = '';
axios.get('http://192.168.0.14:3009/mob/sessionchecker')
.then(response => {
    if(response.data == '2'){
        these.props.navigation.navigate("Second");
    }
})

export default class Login extends Component {
    constructor(props){
        super(props);
        
        console.log(props);
        this.logIn = this.logIn.bind(this);

        this.state = {
            strUsername: '',
            strPassword: '',
            user: {},

        }
    }

    

    async componentDidMount() {
        these = this;
    }

    logIn() {
        axios.post('http://192.168.0.14:3009/mob/login', {
            strUsername: this.state.strUsername,
            strPassword: this.state.strPassword,
        })
        .then(response => {
            if(response.data.user == 'none')
                Alert.alert('Incorrect Username or Password. Please try again!')
            else
                this.props.navigation.navigate("Second");
        })
    }


    render() {
       
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../PUPLogo.png')}
                    />
                    <Text style={styles.title}>ISABEL</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor='#557f90'
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        value={this.state.strUsername}
                        onChangeText={(strUsername) => this.setState({strUsername})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor='#557f90'
                        secureTextEntry
                        returnKeyType="go"
                        ref={(input) => this.passwordInput = input}
                        value={this.state.strPassword}
                        onChangeText={(strPassword) => this.setState({strPassword})}
                    />
                    <TouchableOpacity 
                        onPress = {this.logIn}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress ={() => Actions.scanner()}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Go to Dashboard</Text>
                    </TouchableOpacity>
                    <Text 
                    style={styles.signup}
                    onPress={() => Actions.signup()}>Don't have an account? Sign up here.
                    </Text>
                </View>
                </KeyboardAvoidingView>
                
                
            
        
        );
    }
    }

    const styles =  StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#557f90",
        },
        logoContainer: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        logo: {
            width: 150,
            height: 150,
        },
        title: {
            color: '#ffffff',
            marginTop: 10,
            fontSize: 40,
            textAlign: 'center',
            opacity: 0.9,
            marginBottom: 10,
        },
        input: {
            height: 40,
            backgroundColor: 'rgba(255,255,255,0.5)',
            marginBottom: 10,
            color: '#ffffff',
            paddingHorizontal: 10,
            borderRadius: 15,
        },
        formContainer: {
            padding: 20,
            backgroundColor: '#557f90',
            marginBottom: 30,
        },
        buttonContainer: {
            borderColor: '#ffffff',
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: 10,
        },
        buttonText: {
            textAlign: 'center',
            color: '#ffffff',
            fontWeight: '700'
        },
        signup: {
            textAlign: 'center',
            color: '#fff',
            marginTop: 10,
        }
    })
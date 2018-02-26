import React, { Component } from 'react'
import  {BackHandler} from 'react-native';
import QRCode from 'react-native-qrcode';
import { Router, Scene, Actions } from 'react-native-router-flux';
import axios from 'axios';
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
 
export default class QrCode extends Component {
  constructor(props){
        super(props);
        this.state = {
            strLicenseNo: '',
        }
    }

    componentWillMount() {
        axios.get('http://192.168.0.14:3009/mob/session')
        .then(response => {
            console.log(response.data)
            this.setState({ strLicenseNo: response.data.user });
        })
    }

  static navigationOptions = {
        title: "QR Code",
        headerStyle: {
            backgroundColor: "#557f90",
            borderTopWidth: 24,
            borderTopColor: "#4c7282",
            height: 80,
        },
        headerTitleStyle: {
            color: "white",
            alignItems: "center",
        },
    }
  render() {
    if(this.state.strLicenseNo != ''){
        return (
        <View style={styles.container}>
            <QRCode
            value={this.state.strLicenseNo}
            size={300}
            bgColor='#557f90'
            fgColor='white'/>
        </View>
        );
    }
    else{
        return (
        <View style={styles.container}>

        </View>
        );
    }
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});
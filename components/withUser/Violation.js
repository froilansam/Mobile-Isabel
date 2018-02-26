import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Alert,
    TextInput,
    TouchableOpacity} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item as FormItem } from "native-base";
import axios from 'axios';
import ModalBox from 'react-native-modalbox';
import CustomMultiPicker from "react-native-multiple-select-list";
import { Router, Scene, Actions } from 'react-native-router-flux';
const Item = Picker.Item;
export default class Violation extends Component{
    constructor(props){
      super(props);
        this.state = {
        userList: {},
        language: '',
        selected1: "key1",
        strLicenseNo: this.props.navigation.state.params.license,
        violation:"",
        }


  }
     onValueChange(value) {
        this.setState({
        selected1: value
        });
    }
    componentDidMount() {
        axios.get('http://192.168.0.14:3009/mob/violation')
        .then(response => {
            this.setState({userList: response.data.violations})
        })
    }

    static navigationOptions = {
        title: "Violation/s",
        headerStyle: {
            backgroundColor: "#557f90",
            // borderTopWidth: 24,
            borderTopColor: "#4c7282",
            // height: 80,
        },
        headerTitleStyle: {
            color: "white",
            alignItems: "center",
        }
    }
    render(){
        return(
             <View>
                <View
                    >
               <CustomMultiPicker
                    options={this.state.userList}
                    search={true} // should show search bar? 
                    multiple={true} // 
                    placeholder={"Search"}
                    placeholderTextColor={'#757575'}
                    returnValue={"label"} // label or value 
                    callback={(res)=>{
                        console.log(res)
                        this.setState({violation: res})
                    }} // callback, array of selected items 
                    rowBackgroundColor={"#eee"}
                    rowHeight={40}
                    rowRadius={5}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"ios-checkmark-circle-outline"}
                    unselectedIconName={"ios-radio-button-off-outline"}
                    scrollViewHeight={Dimensions.get('window').height/2 + Dimensions.get('window').height/6}
                    selected={[]} // list of options which are selected by default 
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity 
                        style={styles.buttonContainer}
                        onPress={()=>Actions.mapvio({violation: this.state.violation, license: this.state.strLicenseNo})}>
                        <Text 
                        style={styles.buttonText}
                        >NEXT</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>
                
             </View>  
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 10,
        color: '#ffffff',
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    buttonContainer: {
        borderColor: '#557f90',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 10,
        width: Dimensions.get('window').width-30,

    },
    buttonText: {
        textAlign: 'center',
        color: '#557f90',
        fontWeight: '700'
    },
});
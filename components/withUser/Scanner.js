import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput , Alert} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import axios from 'axios';
import ModalBox from 'react-native-modalbox';
import CustomMultiPicker from "react-native-multiple-select-list";
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Container, Header, Content, Item, Input,Title, Grid, Col, ActionSheet } from 'native-base';
 
//ACTIONSHEET TJINGS

var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class Scanner extends React.Component {
  constructor(props){
      super(props);
    this.state = {
        hasCameraPermission: null,
        called: false,
        called1: false,
        clicked: '',
        strLicenseNo: '',
        details: "",
    }


  }
  
  
  

  static navigationOptions = {
        tabBarLabel: "Scanner",
        title: "Scanner",
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

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          
          <View >
          <ModalBox
            style={{backgroundColor: '#557f90'}}
            isOpen={this.state.called}
            onClosingState={() =>{
                this.setState({called: false})
            }}
            swipeToClose = {true}
            coverScreen ={true}
            animationDuration = {1000}
            swipeThreshold = {Dimensions.get('window').height-300}>
            
                    <View >
                    <View style={{height: (Dimensions.get('window').height/2) + (Dimensions.get('window').height/8) }}>
                    <Title style={{alignItems: 'center', fontSize: 25, color: '#ffffff', marginTop: 15}}>DRIVER'S INFORMATION</Title>
                    <Grid>
                    <Col style={{height: 80, marginRight: 10, marginLeft: 10,}}>
                    <Text  style={{color: '#ffffff', marginLeft: 5, marginBottom: 5, marginTop: 5, fontSize: 18}}>Last Name</Text>
                    <Input 
                        disabled
                        style={styles.input}
                        placeholderTextColor='#557f90'
                        value={this.state.details.strLicenseLastName}
                    />
                    </Col>
                    <Col style={{height: 80,marginRight: 10, marginLeft: 10,}}>
                    <Text style={{color: '#ffffff', marginLeft: 5, marginBottom: 5, marginTop: 5, fontSize: 18}}>First Name</Text>
                    <Input 
                        disabled
                        style={styles.input}
                        placeholderTextColor='#557f90'
                        value={this.state.details.strLicenseFirstName}
                    />
                    </Col>
                    </Grid>
                    <Grid>
                    <Col style={{height: 80, marginRight: 10, marginLeft: 10,}}>
                    <Text style={{color: '#ffffff', marginLeft: 5, marginBottom: 5, marginTop: 5, fontSize: 18}}>Address</Text>
                    <Input 
                        disabled
                        style={styles.input}
                        placeholderTextColor='#557f90'
                        value={this.state.details.strLicenseAddress}
                    />
                    </Col>
                    </Grid>
                    <Grid>
                    <Col style={{height: 80, marginRight: 10, marginLeft: 10,}}>
                    <Text style={{color: '#ffffff', marginLeft: 5, marginBottom: 5, marginTop: 5, fontSize: 18}}>Birthdate</Text>
                    <Input 
                        disabled
                        style={styles.input}
                        placeholderTextColor='#557f90'
                        value={this.state.details.datLicenseBirthDate}
                    />
                    </Col>
                    </Grid>
                    <Grid>
                    <Col style={{height: 80, marginRight: 10, marginLeft: 10,}}>
                    <Text style={{color: '#ffffff', marginLeft: 5, marginBottom: 5, marginTop: 5, fontSize: 18}}>License Number</Text>
                    <Input 
                        disabled 
                        style={styles.input}
                        placeholderTextColor='#557f90'
                        value={this.state.details.strLicenseLicenseNo}
                    />
                    </Col>
                    </Grid>
                    
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity 
                        onPress = {() =>{
                            this.setState({called: false});
                            Actions.violation({license: this.state.details.strLicenseLicenseNo})
                            {/* this.props.navigation.navigate("Fifth"); */}
                            

                        }}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>CONFIRM</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                    </View>

              
          </ModalBox>
          </View>
           
        </View>
      );
    }
  }


  
  _handleBarCodeRead = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    Alert.alert(data);
    this.setState({strLicenseNo: data})
    axios.post('http://192.168.0.14:3009/mob/multa', {
        strLicenseNo: this.state.strLicenseNo,
    })
    .then(res=>{
        console.log(res.data)
        this.setState({details: res.data});
        this.setState({called: true})
    })
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
            backgroundColor: 'rgba(255,255,255,0.5)',
            marginBottom: 10,
            color: '#ffffff',
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
            width: Dimensions.get('window').width-40,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
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
import React, { Component } from 'react';
import { Platform, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {  MapView, Constants, Location, Permissions} from 'expo';
import Geocoder from 'react-native-geocoding'; // 0.2.0
import {Marker} from 'react-native-maps';
import { Router, Scene, Actions } from 'react-native-router-flux';
import axios from 'axios';
Geocoder.setApiKey('AIzaSyCf4tg1RlWH2nOcVW6jBnBZYvS2PBAupTk')



export default class App extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    location: null,
    errorMessage: null,
    get: 0,
    latitude: 14.5995,
    longitude: 120.9842,
    strLicenseNo: this.props.navigation.state.params.license,
    violation: this.props.navigation.state.params.violation,
  };
  
  componentDidMount() {
    
      this._getLocationAsync();
    
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
    this.setState({ longitude: location.coords.longitude, latitude: location.coords.latitude})
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    let { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.005 //Very high zoom level
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      
      let latitude2 = parseFloat(
            JSON.stringify(this.state.location.coords.latitude)
        );
        let longitude2 = parseFloat(
            JSON.stringify(this.state.location.coords.longitude)
        );
        if(this.state.get == 0){
        Geocoder.getFromLatLng(latitude2, longitude2).then(
            json => {
            var address_component = json.results[0].formatted_address;
            this.setState({ geocode: address_component});
            console.log(address_component);
            this.setState({get: 1});
            },
            error => {
              alert(error);
            }
        
        );
        }
    }
    if(this.state.location != null){ 
      return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          initialRegion={{latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}}
          onRegionChange={this._handleMapRegionChange}
        >
          <Marker
          coordinate={{latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude}}
          title={this.state.geocode}
          />
        </MapView>
        <Text>Location: {this.state.geocode}</Text>
        <TouchableOpacity 
                        style={styles.buttonContainer}
                        onPress={()=>{
                          axios.post('http://192.168.0.14:3009/mob/putvio', {
                            strLicenseNo: this.state.strLicenseNo,
                            violation: this.state.violation,
                            strTicketAdress: this.state.geocode,
                          })
                          Actions.login();
                        }}>
                        <Text 
                        style={styles.buttonText}
                        >SUBMIT</Text>
                        </TouchableOpacity>
      
      </View>
      );
    }
    else{
      return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        
        
        
                        
      </View>
      );
    }
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
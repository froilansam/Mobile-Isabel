import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';


export default class App extends Component {
  constructor(props){
    super(props);

    this.onRegionChange = this.onRegionChange.bind(this);
    

    this.state = {
    location: null,
    errorMessage: null,
    region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        
      },
  };
  }
  
  

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  

  onRegionChange(region) {
    this.setState({ region });
  }


  render() {
    let text = 'Waiting..';
    let latitude = 2;
    let longitude = 2;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      latitude = parseFloat(JSON.stringify(this.state.location.coords.latitude));
      longitude = parseFloat(JSON.stringify(this.state.location.coords.longitude));
    }

    return (
        <MapView
      region={this.state.region}
      onRegionChange={this.onRegionChange}
      style={{flex: 1}}
    >

      
       
          <MapView.Marker
            coordinate={{latitude: latitude,
                         longitude: longitude}}
            title={"Your Driver License is currently here."}
            description={"po"}
    />
      </MapView>

      
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
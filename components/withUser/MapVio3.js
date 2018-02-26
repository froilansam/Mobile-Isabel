import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Location, Permissions, MapView } from 'expo';
import {Marker} from 'react-native-maps';
import { Dropdown } from 'react-native-material-dropdown'; // 0.6.1
// 0.6.1
import Geocoder from 'react-native-geocoding'; // 0.2.0
Geocoder.setApiKey('AIzaSyBnLyu9KRX0dTheISKLkC2IUUBKeWD7TdU');
export default class MapVio extends Component {
  constructor(props){
    super(props);
    this.state = {
      locationResult: null,
      location: null,
      errorMessage: null,
      latitude: 0,
      longitude: 0,
      geocode: null,
      get: 0,
    };
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude, location: location });
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
     let { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.005 //Very high zoom level
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
    let data = [
      {
        value: 'Private',
      },
      {
        value: 'Public',
      },
    ];

      let text = 'Waiting..';
      let latitude = 2;
      let longitude = 2;
      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
        latitude = parseFloat(
          JSON.stringify(this.state.latitude)
        );
        longitude = parseFloat(
          JSON.stringify(this.state.longitude)
        );

        if(this.state.get == 0){
          Geocoder.getFromLatLng(latitude, longitude).then(
            json => {
              var address_component = json.results[0].formatted_address;
              this.setState({ geocode: address_component });
            },
            // error => {
            //   alert(error);
            // }
          );
          this.setState({get: 1});
        }

      }
   

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>

        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          showsTraffic={true}
          initialRegion={{latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}}
          onRegionChange={this._handleMapRegionChange}
          >

          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            title={this.state.geocode}
          />


          
        </MapView>


        <Dropdown
          containerStyle={{ width: Dimensions.get('window').width - 50 }}
          label="Vehicle Type"
          data={data}
          onChangeText={value => {
            console.log(value);
          }}
        />
      </View>
    );
  }
}

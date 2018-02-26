import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import axios from 'axios';
import {AppLoading} from 'expo';
import { Router, Scene, Actions } from 'react-native-router-flux';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Root} from 'native-base';

import Login from './components/noUser/Login.js';
import Signup from './components/noUser/Signup.js';
import Dashboard from './components/withUser/Dashboard.js';
import Profile from './components/withUser/Profile.js';
import QrCode from './components/withUser/QrCode.js';
import Scanner from './components/withUser/Scanner.js';
import Violation from './components/withUser/Violation.js';
import MapVio from './components/withUser/MapVio.js';


const Router1 = (navigation) => (
    <Router>
        <Scene key="root">
            <Scene
                key="login"
                component={Login}
                initial
                hideNavBar
                onEnter= {() => {
                    Actions.login(navigation)
                }}
            />
            
            <Scene
                key="signup"
                component={Signup}
                direction = "vertical"
                hideNavBar
                modal
            />
            <Scene
                key="scanner"
                component={Scanner}
                direction = "vertical"
            />
            <Scene
                key="violation"
                component={Violation}
                direction = "vertical"
            />
            <Scene
                key="mapvio"
                component={MapVio}
                direction = "vertical"
            />
        </Scene>
    </Router>
);


//For Enforcer
const TabEnforcer = TabNavigator({
    Tab1:{ screen: Scanner},
},
    {
        tabBarPosition: "bottom",
        swipeEnabled: true,
        initialRouteName: "Tab1",
        tabBarOptions: {
            labelStyle: {
                fontSize: 10,
                padding: 10
            },
            style:{
                backgroundColor: "#557f90"
            },
            indicatorStyle: {
                backgroundColor: "white"
            },
            inactiveBackgroundColor: "#557f90",
            activeBackgroundColor: "#4c7282",
            inactiveTintColor: "black",
            activeTintColor: "white",
        }
    }
);

const TabScreens = TabNavigator({
    Tab1:{ screen: Dashboard},
    Tab3:{ screen: Profile}
},
    {
        tabBarPosition: "bottom",
        swipeEnabled: true,
        initialRouteName: "Tab1",
        tabBarOptions: {
            labelStyle: {
                fontSize: 10,
                padding: 10
            },
            style:{
                backgroundColor: "#557f90"
            },
            indicatorStyle: {
                backgroundColor: "white"
            },
            inactiveBackgroundColor: "#557f90",
            activeBackgroundColor: "#4c7282",
            inactiveTintColor: "black",
            activeTintColor: "white",
        }
    }
);

const RootNavigator = StackNavigator({
    First: {
        screen: Router1,
        navigationOptions: {
            header: null,
        }
    },
    Second: {
        screen: TabScreens,
        navigationOptions: {
            headerLeft: null,
        }
    },
    Third: {
        screen: QrCode,
        navigationOptions: {
        }
    },
    Fourth: {
        screen: TabEnforcer,
        navigationOptions: {
        }
    },
    Fifth: {
        screen: Violation,
        navigationOptions: {
        }
    },
    Sixth: {
        screen: MapVio,
        navigationOptions: {
        }
    },
}, {
        headerMode: "float",
});



export default class App extends Component {
    state = {
        isReady: false,
    };

    render(){
        if(!this.state.isReady){
            return (
                <AppLoading
                  startAsync={this._cacheResourcesAsync}
                  onFinish={() => this.setState({ isReady: true })}
                  onError={console.warn}
                />
            );
        }
        return(
                <RootNavigator/>
        );
    }
    async _cacheResourcesAsync() {
        const images = [
          require('./PUPLogo.png'),
        ];
    
        const cacheImages = images.map((image) => {
          return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages)
    
      }
}


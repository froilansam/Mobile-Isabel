import React, {Component} from 'react';
import {
    View, 
    StyleSheet,
    TouchableOpacity,
    BackHandler,} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, List, ListItem, Text } from 'native-base';
import axios from 'axios';


export default class Dashboard extends Component{
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }
    



    logout() {
        axios.get('http://192.168.0.14:3009/mob/logout')
        .then(response => {
            if(response.data == 'success'){
                this.props.navigation.navigate("First");
            }
        })

    }
    static navigationOptions = {
        tabBarLabel: "Profile",
        title: "Profile",
        headerStyle: {
            backgroundColor: "#557f90",
            borderTopWidth: 24,
            borderTopColor: "#4c7282",
            height: 80,
        },
        headerTitleStyle: {
            color: "white",
            alignItems: "center",
        }
    }

    
    render(){
        return(
            <Container>
                <Content>
                    <List>
                        <ListItem itemHeader first>
                            <Text>Profile</Text>
                        </ListItem>
                        <ListItem >
                            <Text>View Account Profile</Text>
                        </ListItem>
                        <ListItem itemHeader>
                            <Text>Settings</Text>
                        </ListItem>
                        <ListItem
                        onPress={() => {
                        this.props.navigation.navigate("Third");
                        }}>
                            <Text>QR Code</Text>
                        </ListItem>
                        <ListItem
                         onPress={() => {
                        this.logout()
                        }}>
                            <Text>Log Out</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    }
});
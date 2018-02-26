import React, {Component} from 'react';
import {
    Text, 
    StyleSheet,
    Modal,
    Button,
    Alert,
    Dimensions,
    BackHandler,
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import {
    Container,
    Header,
    Content,
    Body,
    Title,
    Card,
    CardItem,
} from 'native-base';
import ModalBox from 'react-native-modalbox';
import axios from 'axios';

var these = '';
axios.get('http://192.168.0.14:3009/mob/sessionchecker')
.then(response => {
    BackHandler.addEventListener('hardwareBackPress', function() {
    // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
    // Typically you would use the navigator here to go to the last state.

        if(response.data == '2'){
            BackHandler.exitApp();
            these.props.navigation.navigate("Second");
        }
    });
});




        



export default class Dashboard extends Component{
    
    constructor(props){
        super(props)
        
        this.puta = this.puta.bind(this);
        this.state = {
            card: [],
            renderCards: 0,
            violation: [],
        }
        
    }



    
   

    static navigationOptions = {
        tabBarLabel: "Dashboard",
        title: "Dashboard",
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

    puta(){
        axios.get('http://192.168.0.14:3009/mob/tickets')
        .then(response => {
            this.setState({card: response.data})
            if(this.state.renderCards === 0){
                for(var i=0; i<this.state.card.length; i++){
                    this.state.card[i].cardVisible = false;
                }
                this.setState({renderCards: 1});
                console.log(this.renderCards)
                console.log(this.state.card)
            }
        });
    }

    componentWillMount(){
        these = this;
        this.puta()
        
    }
        
    render(){
        
        return(
            <Container style={styles.container}>
                <Content>
                    {this.state.card.map(x => (
                        <Card style={styles.card} key={x.intTicketID}>
                            <CardItem header>
                                <Text>{"Ticket Number: " + x.intTicketID}</Text>
                            </CardItem>
                            <CardItem>
                                <Button onPress={() =>{
                                        x.cardVisible = true
                                        this.setState(this.state)
                                        axios.post('http://192.168.0.14:3009/mob/ticvio', {
                                            intTicketID: x.intTicketID,
                                        })
                                        .then(response => {
                                            this.setState({violation: response.data})
                                        })
                                    }
                                }
                                    title="More Details"
                                    color="#557f90">
                                </Button>
                            </CardItem>
                        </Card>
                        )
                    )}
                    {this.state.card.map(x => (
                        <ModalBox 
                            isOpen={x.cardVisible} 
                            key={x.intTicketID+"Modal"} 
                            swipeToClose = {true}
                            coverScreen ={true}
                            animationDuration = {1000}
                            swipeThreshold = {Dimensions.get('window').height-300}
                            onClosingState={() =>{
                            x.cardVisible = false;
                            this.setState(this.state)
                            }}>
                            <Container style={styles.container}>
                                <Content>
                                    <Text style={{margin: 20}}>{"Ticket Number: " + x.intTicketID + "\nFine: " + x.strLicenseNo}</Text>
                                    {this.state.violation.map(y => ( 
                                        <Text key={y.intViolationid} style={{margin: 20}}>{"Section: " + y.strSection + "\nViolation: " + y.strViolation + "\nFine: " + y.intCharge}</Text>
                                    ))}
                                    <Text style={{margin: 20}}>To settle your payment, please log on to http://localhost:3009/login</Text>
                                    
                                    <Button onPress={() =>{
                                        x.cardVisible = false;
                                        this.setState(this.state)}
                                        }
                                            title="Close"
                                            color="#557f90">
                                    </Button>
                                </Content>
                            </Container>
                        </ModalBox>
                    ))}
                </Content>
            </Container>
        );
    }
}
var screen = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
    },
    card: {
        padding: 10,
        width: screen.width - 20,
    },
});
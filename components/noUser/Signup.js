import React, {Component} from 'react';
import { DatePickerIOS, StyleSheet, View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios';

class Signup extends Component {
    constructor(props){
        super(props);
        this.licenseValidation = this.licenseValidation.bind(this);
        this.licenseColor = this.licenseColor.bind(this);
        this.usernameValidation = this.usernameValidation.bind(this);
        this.usernameColor = this.usernameColor.bind(this);
        this.emailColor = this.emailColor.bind(this);
        this.birthdateColor = this.birthdateColor.bind(this);
        this.submitsignup = this.submitsignup.bind(this);
        this.state = {
            strUsername: '',
            strEmail: '',
            strLicenseNo: '',
            licenseValid: 1,
            usernameValid: 1,
            emailValid: 1,
            isDateTimePickerVisible: false,
            datBirthDate: 'YYYY-MM-DD',
            birthdateValid: 1,

        }
    }


    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleDatePicked = (date) => {
        var bday = JSON.stringify(date).split('T');
        var bday2 = bday[0].split('"')
        this.setState({datBirthDate: bday2[1], birthdateValid: 2})
        this._hideDateTimePicker();
    };

    submitsignup(){
        if(this.state.licenseValid == 3 && this.state.emailValid == 3 && this.state.usernameValid == 3 && this.state.birthdateValid ==2){
            
            axios.post('http://192.168.0.14:3009/signup',{
                strLicenseNo: this.state.strLicenseNo,
                strUsername: this.state.strUsername,
                strEmail: this.state.strEmail,
                datBirthDate: this.state.datBirthDate,
                
            })
            .then(response => {
                console.log(response.data);
                Actions.login()
            })

        }
        else{
            Alert.alert('Please fill up the form with valid information')
        }
    }

    licenseValidation(){
        if(this.state.licenseValid == 1){
            <Text style={styles.valid}> </Text>
        }
        else if(this.state.licenseValid == 2){
            return(
                <Text style={styles.valid}>Incorrect Format. Ex: X99-99-999999</Text>
            );
        }
        else if(this.state.licenseValid == 4){
            return(
                <Text style={styles.valid}>This license number has already an account.</Text>
            );
        }
        else if(this.state.licenseValid == 3){
            return(<Text> </Text>);
        }
    }

    usernameValidation() {
        if(this.state.usernameValid == 1){
            <Text style={styles.valid}> </Text>
        }
        else if(this.state.usernameValid == 2){
            return(
                <Text style={styles.valid}>The username must be minimum of 6 characters and maximum of 30 characters and can only consist of alphabetical, number, dot and underscore</Text>
            );
        }
        else if(this.state.usernameValid == 3){
            return(<Text> </Text>);
        }
        else if(this.state.usernameValid == 4){
            return(<Text style={styles.valid}> This username has been taken. </Text>);
        }
    }

    emailValidation() {
        if(this.state.emailValid == 1){
            <Text style={styles.valid}> </Text>
        }
        else if(this.state.emailValid == 2){
            return(
                <Text style={styles.valid}>Please enter valid e-mail address.</Text>
            );
        }
        else if(this.state.emailValid == 3){
            return(<Text> </Text>);
        }
        else if(this.state.emailValid == 4){
            return(<Text style={styles.valid}>This e-mail address has been taken.</Text>);
        }
    }

    licenseColor(){
        if(this.state.licenseValid == 2 || this.state.licenseValid == 4){
            return({
                height: 40,
                backgroundColor: 'rgba(255,0,0,0.2)',
                marginBottom: 10,
                color: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,
                borderWidth: 1,
                borderColor: 'red'
            })
        }
        else if(this.state.licenseValid == 1) {
            return(
                {height: 40,
                backgroundColor: 'rgba(255,255,255,0.5)',
                marginBottom: 10,
                color: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,}
            )
        }
        else if(this.state.licenseValid == 3){
            return(
                {height: 40,
                backgroundColor: 'rgba(255,255,255,0.5)',
                marginBottom: 10,
                color: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,
                borderWidth: 1,
                borderColor: 'green'}
            )
        }
    }

    usernameColor(){
        if(this.state.usernameValid == 2 || this.state.usernameValid == 4){
            return({
                height: 40,
                backgroundColor: 'rgba(255,0,0,0.2)',
                marginBottom: 10,
                color: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,
                borderWidth: 1,
                borderColor: 'red'
            })
        }
        else if(this.state.usernameValid == 1) {
            return(
                {height: 40,
                backgroundColor: 'rgba(255,255,255,0.5)',
                marginBottom: 10,
                color: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,}
            )
        }
        else if(this.state.usernameValid == 3){
            return(
                {height: 40,
                backgroundColor: 'rgba(255,255,255,0.5)',
                marginBottom: 10,
                color: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,
                borderWidth: 1,
                borderColor: 'green'}
            )
        }
    }

    emailColor(){
        if(this.state.emailValid == 2 || this.state.emailValid == 4){
            return({
                height: 40,
                backgroundColor: 'rgba(255,0,0,0.2)',
                marginBottom: 10,
                color: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,
                borderWidth: 1,
                borderColor: 'red'
            })
        }
        else if(this.state.emailValid == 1) {
            return(
                {height: 40,
                backgroundColor: 'rgba(255,255,255,0.5)',
                marginBottom: 10,
                color: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,}
            )
        }
        else if(this.state.emailValid == 3){
            return(
                {height: 40,
                backgroundColor: 'rgba(255,255,255,0.5)',
                marginBottom: 10,
                color: '#ffffff',
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,
                borderWidth: 1,
                borderColor: 'green'}
            )
        }
    }

    

    birthdateColor(){
        if(this.state.birthdateValid == 2){
            return(
                {height: 40,
                backgroundColor: 'rgba(255,255,255,0.5)',
                marginBottom: 10,
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,
                borderWidth: 1,
                borderColor: 'green'}
            )
        }
        else if(this.state.birthdateValid == 1){
            return({
                height: 40,
                backgroundColor: 'rgba(255,255,255,0.5)',
                marginBottom: 10,
                paddingHorizontal: 10,
                borderRadius: 15,
                width: 250,
                }
            )
        }
    }

    render(){
        return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.formContainer}>
                <Text
                    style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: 30,
                        color: 'white',
                        marginBottom: 50,
                        fontWeight: '700'
                    }}>ISABEL</Text>
                <TextInput
                    style={this.licenseColor()}
                    placeholder="License Number"
                    placeholderTextColor='#557f90'
                    value={this.state.strLicenseNo}
                    returnKeyType="next"
                    onChangeText={(strLicenseNo) => this.setState({strLicenseNo})}
                    onEndEditing={() => {
                        var regexp = /([A-Z]{1})+([0-9]{2})+([0-9]{2})+([A-Z0-9]{6})/;
                        if(!(regexp.test(this.state.strLicenseNo)) && this.state.strLicenseNo == '' ){
                             this.setState({licenseValid: 1});

                        }
                        else if(!(regexp.test(this.state.strLicenseNo)) && this.state.strLicenseNo != ''){
                            this.setState({licenseValid: 2});
                        }
                        else{
                            
                            axios.post('http://192.168.0.14:3009/mob/checkAccounts/license', {
                                strLicenseNo: this.state.strLicenseNo,
                            })
                            .then(response =>{
                                if(response.data.license == false){
                                    this.setState({licenseValid: 4})
                                }
                                else if(response.data.license == true){
                                    this.setState({licenseValid: 3})
                                }
                            })
                            
                        }
                    }}
                />
                {this.licenseValidation()}
                <TextInput
                    style={this.usernameColor()}
                    placeholder="Username"
                    placeholderTextColor='#557f90'
                    returnKeyType="next"
                    onChangeText={(strUsername) => this.setState({strUsername})}
                    minLength={6}
                    maxLength = {30}
                    onEndEditing={() => {
                        var regexp = /^[a-zA-Z0-9_\.]+$/;
                        if(!(regexp.test(this.state.strUsername)) && this.state.strUsername == '' ){
                             this.setState({usernameValid: 1});

                        }
                        else if(!(regexp.test(this.state.strUsername)) && this.state.strUsername != '' || this.state.strUsername.length < 6 && this.state.strUsername.length != 0){
                            this.setState({usernameValid: 2});
                        }
                        else{
                            axios.post('http://192.168.0.14:3009/mob/checkAccounts/username', {
                                strUsername: this.state.strUsername,
                            })
                            .then(response =>{
                                if(response.data.username == false){
                                    this.setState({usernameValid: 4})
                                }
                                else if(response.data.username == true){
                                    this.setState({usernameValid: 3})
                                }
                            })
                        }
                    }}
                />
                {this.usernameValidation()}
                <TextInput
                    style={this.emailColor()}
                    placeholder="E-mail Address"
                    placeholderTextColor='#557f90'
                    returnKeyType="next"
                    onChangeText={(strEmail) => this.setState({strEmail})}
                    onEndEditing={() => {
                        var regexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
                        if(!(regexp.test(this.state.strEmail)) && this.state.strEmail == '' ){
                             this.setState({emailValid: 1});

                        }
                        else if(!(regexp.test(this.state.strEmail)) && this.state.strEmail != ''){
                            this.setState({emailValid: 2});
                        }
                        else{
                             axios.post('http://192.168.0.14:3009/mob/checkAccounts/email', {
                                strEmail: this.state.strEmail,
                            })
                            .then(response =>{
                                if(response.data.email == false){
                                    this.setState({emailValid: 4})
                                }
                                else if(response.data.email == true){
                                    this.setState({emailValid: 3})
                                }
                            })
                        }
                    }}
                />
                {this.emailValidation()}
                <TouchableOpacity onPress={this._showDateTimePicker} style={this.birthdateColor()}>
                <Text style={{color: 'white', marginTop: 10}}>{this.state.datBirthDate}</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    maximumDate={new Date()}
                />
                <TouchableOpacity 
                    onPress={this.submitsignup}
                    style={{backgroundColor: 'white', marginBottom: 10 }}>
                    <Text style={{color: '#557f90',justifyContent: 'center', fontWeight: '700',textAlign: 'center', paddingBottom: 10, paddingTop: 10}}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>Actions.pop()}
                    style={{borderColor: '#ffffff',
                            borderTopWidth: 1,
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                            }}>
                    <Text style={{color: '#FFF', justifyContent: 'center', fontWeight: '700',textAlign: 'center', paddingBottom: 10, paddingTop: 10}}>BACK</Text>
                </TouchableOpacity>
                

            </View>
        </KeyboardAvoidingView>
        );
    }
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#557f90",
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        padding: 20,
        backgroundColor: '#557f90',
        marginBottom: 30,
    },
    inputCorrect: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 10,
        color: 'white',
        paddingHorizontal: 10,
        borderRadius: 15,
        width: 250,
    },
    inputWrong: {
        height: 40,
        backgroundColor: 'rgba(255,160,122,0.5)',
        marginBottom: 10,
        color: '#ffffff',
        paddingHorizontal: 10,
        borderRadius: 15,
        width: 250,
    },
    valid: {
        color: 'red',
        marginBottom: 15,
        textAlign: 'center',
        width: 250
    }
})

export default Signup;
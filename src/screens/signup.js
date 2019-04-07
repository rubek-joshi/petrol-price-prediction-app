import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Keyboard, Image, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextField } from 'react-native-material-textfield';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {ServerIp} from '../config/server';

class SignUp extends Component {
    constructor(props) {
        super(props);
        axios.defaults.baseURL = ServerIp; //set the default base url
        this.state = {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: [
                '', // fullname
                '', // email
                '', // password
                '' // confirmPassword
            ],
        }
        this._signUp = this._signUp.bind(this);
        this.validateRequired = this.validateRequired.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.passwordMatch = this.passwordMatch.bind(this);
    }
    _signUp() {
        Keyboard.dismiss();
        this.loadingButton.showLoading(true);
        let currentErrors = this.state.errors;
        if(!this.validateRequired()){
            this.loadingButton.showLoading(false);
        }
        if(!this.validateEmail()){
            console.log('email invalid');
            this.loadingButton.showLoading(false);
            currentErrors[1] = 'Email is not valid';
        } else {
            currentErrors[1] = '';
        }
        if(!this.validatePassword()){
            currentErrors[2] = 'Password must be minimum 6 characters and contain atleast one letter and one number.'
        } else {
            currentErrors[2] = ''
        }
        if(this.passwordMatch()){
            axios.post('/api/users/signup',{
                full_name: this.state.fullname,
                email: this.state.email,
                password: this.state.password
            })
            .then(response => {
                console.log(response);
                this.loadingButton.showLoading(false);
                ToastAndroid.show('User successfully registered', ToastAndroid.LONG);
                currentErrors.forEach((value, index, arr) => {
                    arr[index] = '';
                });
            })
            .catch(error => {
                this.loadingButton.showLoading(false);
                console.log(error);
                if(error.response){
                    switch(error.response.data.message){
                        case "Invalid Email":
                            ToastAndroid.show('Please enter a valid email', ToastAndroid.LONG);
                            break;
                        case "Invalid Name":
                            ToastAndroid.show('Please enter a valid name', ToastAndroid.LONG);
                            break;
                        case "Email already exists":
                            ToastAndroid.show('This email has already been used', ToastAndroid.LONG);
                            break;
                        default:
                            ToastAndroid.show('Registration failed', ToastAndroid.LONG);
                            break;
                    }
                } else {
                    ToastAndroid.show('Cannot connect to server', ToastAndroid.LONG);
                }
            });
        } else {
            currentErrors[2] = 'Passwords do not match';
            currentErrors[3] = 'Passwords do not match';
            this.loadingButton.showLoading(false);
        }
        this.setState({errors: currentErrors});
    }
    validateRequired(){
        let fields = [this.state.fullname, this.state.email, this.state.password, this.state.confirmPassword]
        let currentErrors = this.state.errors;
        let status = true;
        fields.forEach((value, index, arr) => {
            let processedValue = value.replace(/\s/g, '')
            if(processedValue == ''){
                currentErrors[index] = 'Cannot be empty';
                status = false;
            } else {
                currentErrors[index] = '';
            }
        });
        this.setState({errors: currentErrors});
        return status;
    }
    validateEmail(){
        let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if(reg.test(this.state.email)) {
            return true;
        }
        return false;
    }
    validatePassword(){
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if(regex.test(this.state.password)) {
            return true;
        }
        return false;
    }
    passwordMatch(){
        if(this.state.password == this.state.confirmPassword){
            return true;
        }
        return false;
    }
    render(){
        return (
            <LinearGradient colors={['#44A59B', '#15DBA5']} style={styles.mainContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.navigate('SignIn')}>
                    <Icon name="arrow-back" size={30} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/logo.png')} style={{height: 220, width: 130}} resizeMode='contain'/>
                </View>
                <View style={{flex: 1,}}>
                    <View style={{marginBottom: 50}}>
                        <TextField
                            textColor={'#FFF'}
                            baseColor={'#FFF'}
                            tintColor={'#FFF'}
                            label='Full Name'
                            value={this.state.fullname}
                            onChangeText={(fullname) => this.setState({fullname: fullname})}
                            error={this.state.errors[0]}
                            autoCapitalize='words'
                            returnKeyType={"next"}
                            onSubmitEditing={() => this.emailTextInput.focus()}
                            blurOnSubmit={false}/>

                        <TextField
                            textColor={'#FFF'}
                            baseColor={'#FFF'}
                            tintColor={'#FFF'}
                            label='Email'
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email: email})}
                            error={this.state.errors[1]}
                            autoCapitalize='none'
                            ref={(input) => {this.emailTextInput = input;}}
                            returnKeyType={"next"}
                            onSubmitEditing={() => this.passwordTextInput.focus()}
                            blurOnSubmit={false}/>

                        <TextField
                            textColor={'#FFF'}
                            baseColor={'#FFF'}
                            tintColor={'#FFF'}
                            label='Password'
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password: password})}
                            error={this.state.errors[2]}
                            autoCapitalize='none'
                            ref={(input) => {this.passwordTextInput = input;}}
                            returnKeyType={"next"}
                            onSubmitEditing={() => this.confirmPasswordTextInput.focus()}
                            blurOnSubmit={false}/>

                        <TextField
                            textColor={'#FFF'}
                            baseColor={'#FFF'}
                            tintColor={'#FFF'}
                            label='Confirm Password'
                            value={this.state.confirmPassword}
                            onChangeText={(confirmPassword) => this.setState({confirmPassword: confirmPassword})}
                            error={this.state.errors[3]}
                            autoCapitalize='none'
                            ref={(input) => {this.confirmPasswordTextInput = input;}}
                            onSubmitEditing={() => this._signUp()}/>
                    </View>

                    <AnimateLoadingButton
                        ref={c => (this.loadingButton = c)}
                        width={260}
                        height={50}
                        title="Sign Up"
                        titleFontSize={16}
                        titleColor="#FFF"
                        backgroundColor="#34485C"
                        borderRadius={4}
                        onPress={this._signUp}
                    />
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16
    },
    backButton: {
        height: 40,
        width: 40,
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
    }
});

export default SignUp;
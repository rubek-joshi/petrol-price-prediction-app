import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Keyboard, Image, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextField } from 'react-native-material-textfield';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
        this._signUp = this._signUp.bind(this);
    }
    _signUp() {
        Keyboard.dismiss();
        this.loadingButton.showLoading(true);
        axios.post('http://192.168.1.68:3000/api/users/signup',{
            full_name: this.state.fullname,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            console.log(response);
            this.loadingButton.showLoading(false);
            ToastAndroid.show('User successfully registered', ToastAndroid.LONG);
        })
        .catch(error => {
            //console.log(error.response.data);
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
            this.loadingButton.showLoading(false);
        });
    }
    render(){
        return (
            <LinearGradient colors={['#44A59B', '#15DBA5']} style={styles.mainContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.navigate('SignIn')}>
                    <Icon name="arrow-back" size={30} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/logo.png')} style={{height: 180, width: 130}}/>
                </View>
                <View style={{flex: 1,}}>
                    <View style={{marginBottom: 20}}>
                        <TextField
                            textColor={'#FFF'}
                            baseColor={'#FFF'}
                            tintColor={'#FFF'}
                            label='Full Name'
                            value={this.state.fullname}
                            onChangeText={(fullname) => this.setState({fullname: fullname})}
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
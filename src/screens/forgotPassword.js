import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, BackHandler, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import axios from 'axios';
import { ServerIp } from '../config/server';
import MyColors from '../config/colors';
import MyFont from '../config/header';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mailSent: false,
            email: '',
            code: '',
            userCode: '',
            error: ''
        }
        this.handleBackButton = this.handleBackButton.bind(this);
        this._onPressHandler = this._onPressHandler.bind(this);
        this._verifyCode = this._verifyCode.bind(this);
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        axios.defaults.baseURL = ServerIp;
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }
    handleBackButton(){
        this.props.navigation.navigate('Auth');
        return true;
    }
    renderHeader(title){
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.touchTarget} onPress={() => this.props.navigation.navigate('Auth')}>
                    <View style={{paddingTop: 4}}>
                        <Icon name='arrow-back' size={24} color='white'/>
                    </View>
                </TouchableOpacity>

                <Text style={styles.headerText}>{title}</Text>
            </View>
        );
    }
    _onPressHandler(){
        Keyboard.dismiss();
        this.loadingButton.showLoading(true);
        if(this.validateEmail()){
            axios.post('/api/users/forgot-password', {
                email: this.state.email
            })
            .then(response => {
                console.log(response);
                if(response.data.message == 'Done') {
                    this.setState({mailSent: true, code: response.data.code});
                }
            })
            .catch(error => {
                this.loadingButton.showLoading(false);
                this.setState({error: 'User not found'});
                console.log(error.message);
            });
        }
    }
    _verifyCode(){
        this.loadingButton.showLoading(true);
        if(this.state.code == this.state.userCode){
            this.props.navigation.navigate('ResetPassword', {
                code: this.state.code
            });
        } else {
            this.loadingButton.showLoading(false);
            this.setState({error: 'The code entered does not match the security. Please try again.'})
        }
    }
    validateEmail(){
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if(regex.test(this.state.email)){
            return true;
        } else {
            this.loadingButton.showLoading(false);
            this.setState({error: 'Please enter valid email address.'})
            return false;
        }
    }
    render(){
        if(this.state.mailSent){
            return (
                <View style={{flex: 1}}>
                    {this.renderHeader('Verify Code')}
                    <Text style = {styles.message}>
                        Please enter the code sent to your email.
                    </Text>
                    <View style={{paddingHorizontal: 16}}>
                        <TextField
                            tintColor={'#000'}
                            inputContainerStyle={{marginBottom: 16}}
                            label= "Code"
                            autoCapitalize='none'
                            keyboardType='number-pad'
                            value={this.state.userCode}
                            onChangeText={(value) => this.setState({userCode: value})}
                            error={this.state.error}
                        />
                        <AnimateLoadingButton
                            ref={c => (this.loadingButton = c)}
                            width={260}
                            height={50}
                            title="Submit"
                            titleFontSize={16}
                            titleColor="#FFF"
                            backgroundColor={MyColors.PRIMARY}
                            borderRadius={4}
                            onPress={this._verifyCode}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View style = {{flex: 1}}>
                    {this.renderHeader('Reset Password')}
                    <View style = {{paddingHorizontal: 16, marginTop: 16}}>
                        <Text style={{fontWeight: 'bold'}}>
                            Please enter your email to reset your password. A temporary secret code will then be sent to your email with which you can use to reset your password.
                        </Text>
                        <TextField
                            tintColor={'#000'}
                            inputContainerStyle={{marginBottom: 16}}
                            label= "Email"
                            autoCapitalize='none'
                            value={this.state.email}
                            onChangeText={(value) => this.setState({email: value, error: ''})}
                            error={this.state.error}
                        />
                        <AnimateLoadingButton
                            ref={c => (this.loadingButton = c)}
                            width={260}
                            height={50}
                            title="Submit"
                            titleFontSize={16}
                            titleColor="#FFF"
                            backgroundColor={MyColors.PRIMARY}
                            borderRadius={4}
                            onPress={this._onPressHandler}
                        />
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    message:{
        fontSize: 18, 
        paddingLeft:20,
        fontFamily: 'Roboto',
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    button: {
        height: 50, 
        backgroundColor: `${MyColors.PRIMARY}`, 
        borderRadius: 5, 
        marginTop: 16,
        alignSelf: 'center', 
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        height: MyFont.HEADER_HEIGHT,
        backgroundColor: `${MyColors.PRIMARY}`,
        flexDirection: 'row',
        elevation: 1
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 16,
        paddingHorizontal: 16
    },
    touchTarget: {
        alignSelf: 'stretch',
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ForgotPassword;
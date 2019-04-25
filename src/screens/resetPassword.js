import React, { Component } from 'react';
import {View, Keyboard, ToastAndroid} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import axios from 'axios';
import Header from '../components/header';
import MyColors from '../config/colors';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            error: '',
            code: null
        }
        this._onPressHandler = this._onPressHandler.bind(this);
        this.passwordMatch = this.passwordMatch.bind(this);
    }
    componentDidMount(){
        this.setState({code: this.props.navigation.getParam('code')}, () => {
            console.log('here is the code', this.state.code);
        });
    }
    _onPressHandler(){
        Keyboard.dismiss();
        this.loadingButton.showLoading(true);
        if(this.passwordMatch()){
            axios.post('/api/users/reset-password/' + this.state.code, {
                new_password: this.state.password
            })
            .then(response => {
                ToastAndroid.show('Password successfully changed', ToastAndroid.LONG);  
                this.props.navigation.navigate('Auth');
            })
            .catch(error => {
                console.log(error);
                this.loadingButton.showLoading(false);
            });
        } else {
            this.loadingButton.showLoading(false);
            this.setState({error: 'Passwords do not match'})
        }
    }
    passwordMatch(){
        if(this.state.password == this.state.confirmPassword){
            return true;
        }
        return false;
    }
    render(){
        return (
            <View style={{flex: 1}}>
                <Header heading='Confirm New Password'/>
                <View style={{padding: 16}}>
                    <TextField
                        label= "Password"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(value) => this.setState({password: value})}
                        onSubmitEditing={() => this.passwordTextInput.focus()}
                        error={this.state.error}
                    />
                    <TextField
                        label= "Confirm Password"
                        autoCapitalize='none'
                        inputContainerStyle={{marginBottom: 16}}
                        secureTextEntry={true}
                        value={this.state.confirmPassword}
                        onChangeText={(value) => this.setState({confirmPassword: value})}
                        ref={(input) => {this.passwordTextInput = input;}}
                        error={this.state.error}
                    />
                    <AnimateLoadingButton
                        ref={c => (this.loadingButton = c)}
                        width={260}
                        height={50}
                        title="Confirm"
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

export default ResetPassword;
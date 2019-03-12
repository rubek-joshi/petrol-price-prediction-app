import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import AnimateLoadingButton from 'react-native-animate-loading-button';

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
        this.loadingButton.showLoading(true);
        // mock
        setTimeout(() => {
          this.loadingButton.showLoading(false);
        }, 1000);
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <TextField
                    label='Full Name'
                    value={this.state.fullname}
                    onChangeText={(fullname) => this.setState({fullname: fullname})}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this.emailTextInput.focus()}
                    blurOnSubmit={false}/>

                <TextField
                    label='Email'
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email: email})}
                    ref={(input) => {this.emailTextInput = input;}}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this.passwordTextInput.focus()}
                    blurOnSubmit={false}/>

                <TextField
                    label='Password'
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password: password})}
                    ref={(input) => {this.passwordTextInput = input;}}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this.confirmPasswordTextInput.focus()}
                    blurOnSubmit={false}/>

                <TextField
                    label='Confirm Password'
                    value={this.state.confirmPassword}
                    onChangeText={(confirmPassword) => this.setState({confirmPassword: confirmPassword})}
                    ref={(input) => {this.confirmPasswordTextInput = input;}}
                    returnKeyType={"done"}/>

                <AnimateLoadingButton
                    ref={c => (this.loadingButton = c)}
                    width={300}
                    height={50}
                    title="Sign Up"
                    titleFontSize={16}
                    titleColor="rgb(255,255,255)"
                    backgroundColor="rgb(29,18,121)"
                    borderRadius={4}
                    onPress={this._signUp}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});

export default SignUp;
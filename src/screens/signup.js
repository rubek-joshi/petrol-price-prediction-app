import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
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
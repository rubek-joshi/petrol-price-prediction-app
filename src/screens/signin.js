import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <TextField
                    label='Email'
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email: email})}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this.emailTextInput.focus()}
                    blurOnSubmit={false}
                />

                <TextField
                    label='Password'
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password: password})}
                    ref={(input) => {this.passwordTextInput = input;}}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this.confirmPasswordTextInput.focus()}
                    blurOnSubmit={false}
                />

                <TouchableOpacity onPress={() => this.props.navigation.navigate('App')}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});

export default SignIn;
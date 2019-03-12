import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import AnimateLoadingButton from 'react-native-animate-loading-button';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.signIn = this.signIn.bind(this);
        this._onPressHandler = this._onPressHandler.bind(this);
    }
    signIn(){
        this.props.navigation.navigate('App');
    }
    _onPressHandler() {
        Keyboard.dismiss();
        this.loadingButton.showLoading(true);
        // mock
        setTimeout(() => {
          this.loadingButton.showLoading(false);
        }, 1000);
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <View style={{marginBottom: 20}}>
                    <TextField
                        label='Email'
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email: email})}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.passwordTextInput.focus()}
                        blurOnSubmit={false}
                    />

                    <TextField
                        label='Password'
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password: password})}
                        ref={(input) => {this.passwordTextInput = input;}}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this._onPressHandler()}
                        blurOnSubmit={false}
                        secureTextEntry={true}
                    />
                </View>

                <AnimateLoadingButton
                    ref={c => (this.loadingButton = c)}
                    width={300}
                    height={50}
                    title="Sign In"
                    titleFontSize={16}
                    titleColor="rgb(255,255,255)"
                    backgroundColor="rgb(29,18,121)"
                    borderRadius={4}
                    onPress={this._onPressHandler}
                />

                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.skipArea}>
                        <Text>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    skipArea: {
        width: 80,
        height: 50,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SignIn;
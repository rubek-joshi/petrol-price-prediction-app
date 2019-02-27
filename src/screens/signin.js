import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

class SignIn extends Component {
    render(){
        return (
            <View style={styles.mainContainer}>
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
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SignIn;
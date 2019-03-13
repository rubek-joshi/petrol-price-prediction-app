import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Home extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name="home" size={24} color="#000" />
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <Text>Home</Text>
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

export default Home;
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MyColors from '../config/colors';

class History extends Component {
    static navigationOptions = {
        title: 'History',
        headerStyle: {
            backgroundColor: `${MyColors.PRIMARY}`
        },
        headerTitleStyle: {
            color: '#FFF',
            fontWeight: '200'
        },
        headerTintColor: '#FFF'
        
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <Text>There is currently no history</Text>
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

export default History;
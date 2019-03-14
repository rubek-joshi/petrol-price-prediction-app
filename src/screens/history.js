import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MyColors from '../config/colors';

class History extends Component {
    render(){
        return (
            <View style={styles.mainContainer}>
                <Text>History</Text>
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
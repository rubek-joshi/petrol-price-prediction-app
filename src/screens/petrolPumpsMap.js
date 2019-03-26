import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MyColors from '../config/colors';

class Map extends Component {
    static navigationOptions = {
        title: 'Petrol Pumps',
        headerStyle: {
            backgroundColor: `${MyColors.PRIMARY}`
        },
        headerTitleStyle: {
            fontWeight: '200'
        },
        headerTintColor: '#FFF'
    }
    constructor(props) {
        super(props);
        
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <Text>Map goes here</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});

export default Map;
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyColors from '../config/colors';

class Information extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name="information-variant" size={24} color={MyColors.MAIN_TAB_MENU} />
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <Text>Information</Text>
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

export default Information;
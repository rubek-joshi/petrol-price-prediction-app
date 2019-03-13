import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MyColors from '../config/colors';

class Newsfeed extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name="news" size={24} color={MyColors.MAIN_TAB_MENU} />
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <Text>Newsfeed</Text>
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

export default Newsfeed;
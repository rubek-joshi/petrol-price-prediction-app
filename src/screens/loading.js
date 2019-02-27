import React, { Component } from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import colors from '../config/colors';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        //check auth
        this.props.navigation.navigate(1 == 2 ? 'App' : 'Auth'); //check token
    }
    render(){
        return(
            <View style={styles.mainContainer}>
                <ActivityIndicator size='large' color={colors.PRIMARY} animating={false}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center'
    }
});
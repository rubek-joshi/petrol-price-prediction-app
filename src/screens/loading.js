import React, { Component } from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import colors from '../config/colors';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <View style={styles.mainContainer}>
                <ActivityIndicator size='large' color={colors.PRIMARY} animating={this.props.isLoading}/>
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
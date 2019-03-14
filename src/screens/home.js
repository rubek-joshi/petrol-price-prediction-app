import React, { Component } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View, TouchableOpacity, Text } from 'react-native';
import MyColors from '../config/colors';

class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: `${MyColors.PRIMARY}`
        },
        headerTitleStyle: {
            color: '#FFF',
            fontWeight: '200'
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {this.setState({refreshing: false})}, 2000);
    }

    render(){
        return (
            <ScrollView 
                style={styles.mainContainer}
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        />
                }
            >
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});

export default Home;
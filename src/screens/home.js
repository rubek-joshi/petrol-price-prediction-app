import React, { Component } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View, TouchableOpacity, Text } from 'react-native';
import MyColors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
            refreshing: false,
            showLastUpdated: true
        }
    }

    _onRefresh = () => {
        this.setState({
            refreshing: true,
            showLastUpdated: false
        });
        setTimeout(() => {this.setState({refreshing: false, showLastUpdated: true})}, 2000);
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
                {this.state.showLastUpdated && 
                <View style={styles.lastUpdatedBox}>
                    <Text>Last updated on: 15/03/2019</Text>
                </View>}

                <View style={styles.box}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{flex: 1, fontWeight: '600'}}>Petrol Market Price</Text>
                        <TouchableOpacity style={styles.historyButton}>
                            <Icon name="history" size={24} color={MyColors.PRIMARY} />
                            <Text style={{paddingLeft: 5}}>History</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F6F6F6'
    },
    lastUpdatedBox: {
        padding: 16,
        backgroundColor: '#FFF',
        elevation: 1
    },
    box: {
        borderRadius: 3,
        backgroundColor: '#FFF',
        elevation: 1,
        marginVertical: 8,
        paddingHorizontal: 16
    },
    historyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 100,
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: 8
    }
});

export default Home;
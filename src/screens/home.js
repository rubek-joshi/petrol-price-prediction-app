import React, { Component } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View, TouchableOpacity, Text, Animated } from 'react-native';
import MyColors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { View as AnimatableView } from 'react-native-animatable';

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
            flashLastUpdated: false
        }
        this._onRefresh = this._onRefresh.bind(this);
    }

    _onRefresh = () => {
        this.setState({refreshing: true, flashLastUpdated: true});
        setTimeout(() => {
            this.setState({refreshing: false, flashLastUpdated: false}); 
        }, 2000);
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
                
                <AnimatableView animation={this.state.flashLastUpdated ? 'flash' : undefined}
                    style={styles.lastUpdatedBox}
                    easing='linear' useNativeDriver>
                    <Text>Last updated on: 15/03/2019</Text>
                </AnimatableView>

                <View style={styles.box}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{flex: 1, fontWeight: '600'}}>Petrol Market Price</Text>
                        <TouchableOpacity style={styles.historyButton}>
                            <Icon name="history" size={24} color={MyColors.PRIMARY} />
                            <Text style={{paddingLeft: 5}}>History</Text>
                        </TouchableOpacity>
                    </View>

                    <Text>Nrs. 110/litre</Text>
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
    box: {
        borderRadius: 3,
        backgroundColor: '#FFF',
        elevation: 1,
        marginVertical: 8,
        paddingHorizontal: 16
    },
    lastUpdatedBox: {
        padding: 16,
        backgroundColor: '#FFF',
        elevation: 1
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
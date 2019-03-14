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
            <View style={styles.mainContainer}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
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
                            <TouchableOpacity style={styles.historyButton} onPress={() => this.props.navigation.navigate('History')}>
                                <Icon name="history" size={24} color={MyColors.PRIMARY} />
                                <Text style={{paddingLeft: 5}}>History</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dailyPriceContainer}>
                            <Text style={{fontSize: 30, fontWeight: '400'}}>Nrs.<Text style={{fontSize: 60}}>110</Text>/litre</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
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
        marginHorizontal: 16,
        paddingHorizontal: 16,
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
    },
    dailyPriceContainer:{
        alignItems: 'center',
        paddingBottom: 16
    }
});

export default Home;
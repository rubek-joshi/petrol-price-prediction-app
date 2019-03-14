import React, { Component } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View, TouchableOpacity, Text, Animated } from 'react-native';
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
            opacity: new Animated.Value(1),
        }
        this._onRefresh = this._onRefresh.bind(this);
    }

    _onRefresh = () => {
        Animated.timing(this.state.opacity, { toValue: 0.5, duration: 1000 }).start();
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false});
            Animated.timing(this.state.opacity, { toValue: 1, duration: 1000 }).start();
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
                
                <Animated.View style={{
                    ...this.props.style,
                    padding: 16,
                    backgroundColor: '#FFF',
                    elevation: 1,
                    opacity: this.state.opacity 
                    }}>
                    <Text>Last updated on: 15/03/2019</Text>
                </Animated.View>

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
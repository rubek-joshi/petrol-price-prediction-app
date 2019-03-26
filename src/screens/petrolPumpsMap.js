import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MyColors from '../config/colors';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const styles = StyleSheet.create({
    mainContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

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
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 27.707716,
                        longitude: 85.325121,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    >
                </MapView>
            </View>
        );
    }
}

export default Map;
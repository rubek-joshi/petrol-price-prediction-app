import React, { Component } from 'react';
import {StyleSheet, View, PermissionsAndroid, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import axios from 'axios';
import MyColors from '../config/colors';

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 27.707716;
const LONGITUDE = 85.325121;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
        }
    }
    componentDidMount(){
        if (this.props.coordinate) return;
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(granted => {
            console.log(granted);
            if(granted === PermissionsAndroid.RESULTS.GRANTED){
                console.log('Access Granted');
            } else {
                this.props.navigation.goBack();
            }
        });
        navigator.geolocation.getCurrentPosition((position) => {
            const currentRegion = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
            this.setState({region: currentRegion});
        }, (error) => {
            console.log(error);
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        });
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={this.state.region}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    loadingEnabled={true}
                    >
                </MapView>
            </View>
        );
    }
}

export default Map;
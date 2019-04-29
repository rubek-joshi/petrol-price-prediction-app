import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MyColors from '../config/colors';

export default class AboutScreen extends Component {
    static navigationOptions = {
        title: 'About',
        headerStyle: {
            backgroundColor: `${MyColors.PRIMARY}`
        },
        headerTitleStyle: {
            color: '#FFF',
            fontWeight: '200'
        },
        headerTintColor: '#FFF'
    }
    render(){
        return (
            <View style={{flex: 1}}>
                <View style={styles.mainContainer}>
                    <Image source={require('../assets/logo.png')} resizeMode='cover' style={{width: 300, height: 150}}/>
                    <Text style={{fontSize: 25, marginTop: 16}}>Petrol Prediction App</Text>
                    <Text style={{marginTop: 8, paddingHorizontal: 40, textAlign: 'center', lineHeight: 20, fontSize: 15}}>
                        Petrol Price is an informative and handy app that can be used to stay updated with the news related to nepal oil and the 
                        latest price changes of multiple places in Nepal while also keeping track of the history of petrol price changes. It also
                        shows the Artificial Intelligence predicted price of petrol while also providing additional utilities through the price calculator and in finding
                        nearby petrol stations.
                    </Text>
                </View>
                <View style = {{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    {/* <Image source={require('../assets/logo.png')} resizeMode='cover' style={{width: 100, height: 50, marginBottom: 8}}/> */}
                    <Text style={{marginBottom: 4}}>&copy; Petrol Price Prediction 2019</Text>
                    <Text style={{fontSize: 12, fontWeight: '400', marginBottom: 16}}>Version 1.0</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 2,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

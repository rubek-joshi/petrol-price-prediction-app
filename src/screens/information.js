import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import IntroSlides from '../components/introSlides';
import MyColors from '../config/colors';

class Information extends Component {
    static navigationOptions = {
        title: 'Information',
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
            showIntro: false
        }
    }
    _onDone = () => {
        this.setState({ showIntro: false });
    }
    _onSkip = () => {
        this.setState({ showIntro: false });
    }
    render(){
        if(this.state.showIntro){
            return <AppIntroSlider slides={IntroSlides} onDone={this._onDone}
            showSkipButton={true} onSkip={this._onSkip}/>;
        } else {
            return (
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.option}>
                        <TouchableOpacity onPress={() => this.setState({showIntro: true})}>
                            <Text>About App</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.option}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PetrolPumpMap')}>
                            <Text>Find Petrol Stations</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    option: {
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
});

export default Information;
import React, {Component} from 'react';
import {StyleSheet, View, AsyncStorage, ActivityIndicator} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';

import MainNavigator from './src/navigations';

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320
  }
});

const slides = [
  {
    key: 'slide-i',
    title: 'Daily Market Price',
    text: 'View and stay updated with the current market price of petrol.',
    image: require('./src/assets/slides/1.png'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'slide-ii',
    title: 'Petrol Calculator',
    text: 'Use petrol calculator to quickly calculate petrol price according to litre or amount.',
    image: require('./src/assets/slides/2.png'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'slide-iii',
    title: 'History',
    text: 'Check history of petrol prices and see what changes have occured in the past.',
    image: require('./src/assets/slides/3.png'),
    imageStyle: styles.image,
    backgroundColor: '#ea6767',
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showRealApp: false
    }
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  _onSkip = () => {
    this.setState({ showRealApp: true });
  }

  componentDidMount(){
    AsyncStorage.getItem('alreadyUsed').then(value => {
      console.log('Already used', value);
      if(value === null) {
        AsyncStorage.setItem('alreadyUsed', 'true');
        this.setState({isLoading: false});
      } else {
        this.setState({showRealApp: true, isLoading: false});
      }
    })
  }

  render() {
    //console.log(this.state);
    if (this.state.isLoading){
      return (
        <View style={styles.mainContainer}>
            <ActivityIndicator size='large' animating={this.state.isLoading}/>
        </View>
      );
    } else {
      if (this.state.showRealApp) {
        return <MainNavigator/>;
      } else {
        return <AppIntroSlider slides={slides} onDone={this._onDone}
                showSkipButton={true} onSkip={this._onSkip}/>;
      }
    }
  }
}
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
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./src/assets/1.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./src/assets/2.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('./src/assets/3.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
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